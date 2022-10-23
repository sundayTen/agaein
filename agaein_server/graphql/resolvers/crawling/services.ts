import { Date, ID } from '../../customTypes';
import { knex } from '../../database';
import { Breed, CrawlingInput, CrawlingResult, CrawlingSummary, Finding_Type, Gender, InputMaybe } from '../../types';
import { getBreedById } from '../breed/services';

export async function getCrawlingResults(id: ID) {
    const history = await knex('crawling_history').where('id', id).first();

    return history === undefined
        ? []
        : history.crawlingResults.results.map((result: any) => result.value).splice(0, 100);
}

export async function getCrawlingHistory(userId: ID) {
    const user = await knex('user').where('id', userId).first();
    const rawHistories = await knex('crawling_history').where('user_id', userId);
    const histories = rawHistories.map((history: any) => {
        history.user = user;
        history.crawlingResults = history.crawlingResults.results.map((result: any) => result.value);
        return history;
    });

    return histories;
}

async function getCrawlingRawResults(type: Finding_Type, breedType: string, foundOrLostDate: Date) {
    return await knex(`crawling_${type.toLowerCase()}_result`)
        .where('type', breedType)
        .andWhere('found_or_lost_date', '>=', foundOrLostDate)
        .orderBy('found_or_lost_date', 'desc');
}

async function filterNameAgeGender(
    results: Array<CrawlingResult>,
    name: InputMaybe<string> | undefined,
    age: InputMaybe<number> | undefined,
    gender: InputMaybe<Gender> | undefined,
) {
    return results.filter((result: any) => {
        let check1 = true;
        let check2 = true;
        let check3 = true;

        if (name != null && result.name != null) {
            check1 = name === result.name;
        }

        if (age != null && result.age != null) {
            check2 = age < Number(result.age) + 2 && age > Number(result.age) - 2;
        }

        if (gender != null && result.gender != null) {
            check3 = gender.toUpperCase() === result.gender;
        }

        return check1 && check2 && check3;
    });
}

async function getScoreMappingResults(filteredResults: Array<CrawlingResult>, baseInfo: CrawlingInput, breed: Breed) {
    const { location, name, age, gender, keywords } = baseInfo;

    const scores = Array.from(Array(filteredResults.length).keys()).map((x) => 0);
    const allFilteredKeywords: any = [];

    for (let i = 0; i < filteredResults.length; i++) {
        if (keywords == null) {
            break;
        }
        let score = 0;
        const filteredKeywords: any = [];
        keywords.forEach((keyword: any) => {
            if (String(filteredResults[i].keywords).includes(keyword)) {
                filteredKeywords.push(keyword);
                score += 3;
            }
        });

        allFilteredKeywords.push(filteredKeywords);
        scores[i] = score;
    }

    for (let i = 0; i < filteredResults.length; i++) {
        let score = 0;
        if (name != null && filteredResults[i].name != null) {
            if (name === filteredResults[i].name) {
                score += 20;
            }
        }

        if (age != null && filteredResults[i].age != null) {
            if (age < Number(filteredResults[i].age) + 2 && age > Number(filteredResults[i].age) - 2) {
                score += 1;
            }
        }

        if (gender != null && filteredResults[i].gender != null) {
            if (gender.toUpperCase() === filteredResults[i].gender) {
                score += 2;
            }
        }

        if (location != null && filteredResults[i].location != null) {
            const resultLocationCoordinate = String(filteredResults[i].location.split('[')[1]);
            if (resultLocationCoordinate !== 'undefined' && !resultLocationCoordinate.includes('위치정보없음')) {
                const resultLat: number = Number(resultLocationCoordinate.split(',')[0]);
                const resultLng: number = Number(String(resultLocationCoordinate.split(',')[1]).replace(']', ''));
                const searchLat: number = location.lat;
                const searchLng: number = location.lng;

                const earthRadius = 6378.135;
                const defaultMultiValue = (Math.PI * 2 * earthRadius) / 360;
                const cosLat: number = Math.cos(resultLat + searchLat);

                const distance = Math.sqrt(
                    ((resultLat - searchLat) * cosLat * defaultMultiValue) ** 2 +
                        ((resultLng - searchLng) * defaultMultiValue) ** 2,
                );

                if (distance < 5) {
                    score += 15;
                } else if (distance < 10) {
                    score += 10;
                } else if (distance < 20) {
                    score += 5;
                }
            }
        }

        if (filteredResults[i].breed != null) {
            if (String(filteredResults[i].breed).includes(breed.breed)) {
                score += 5;
            }
        }

        scores[i] += score;
    }

    const mappedResults = filteredResults.map(function (result: any, i: number) {
        result.keywords = allFilteredKeywords[i];
        return { score: scores[i], value: result };
    });

    mappedResults.sort((a: any, b: any) => {
        return b.score - a.score;
    });

    return mappedResults;
}

export async function processCrawling(userId: ID, baseInfo: CrawlingInput, type: Finding_Type) {
    const { breedId, foundOrLostDate, name, age, gender } = baseInfo;

    const breed: Breed = await getBreedById(breedId);
    const results: Array<CrawlingResult> = await getCrawlingRawResults(type, breed.type, foundOrLostDate);
    const filteredResults: Array<CrawlingResult> = await filterNameAgeGender(results, name, age, gender);
    const mappedResults = await getScoreMappingResults(filteredResults, baseInfo, breed);
    const history: any = {
        user_id: userId,
        crawling_keywords: baseInfo,
        crawling_results: {
            results: mappedResults.map((mappedResult: any, i: number) => {
                mappedResult.value.rank = i + 1;
                mappedResult.value.location = mappedResult.value.location.split('[')[0];
                return mappedResult;
            }),
        },
    };

    return (await knex('crawling_history').insert(history).returning('*'))[0].id;
}

export async function getCrawlingDashboard() {
    const utc: Date = new Date();
    const diffTime: number = utc.getTimezoneOffset() * 60 * 1000;
    const date: Date = new Date(utc.getTime() - diffTime);
    const searchTotalCount: number = (await knex('crawling_history').count())[0].count;
    const searchTodayCount: any = (
        await knex('crawling_history').where('created_at', '>=', date.toISOString().slice(0, 10)).count()
    )[0].count;
    const summary: CrawlingSummary = {
        animalTotalCount: 0,
        animalTodayCount: 0,
        searchTotalCount: searchTotalCount,
        searchTodayCount: searchTodayCount,
    };

    const crawlingCounts: any = (await knex('crawling_site').where('site', 'total').first('info')).info;
    const todayCount: number = crawlingCounts[date.toISOString().slice(0, 10)];
    date.setDate(date.getDate() - 1);
    const yesterdayCount: number = crawlingCounts[date.toISOString().slice(0, 10)];

    if (todayCount === undefined) {
        summary['animalTotalCount'] = yesterdayCount;
    } else if (yesterdayCount !== undefined) {
        summary['animalTotalCount'] = todayCount;
        summary['animalTodayCount'] = todayCount - yesterdayCount;
    }

    return summary;
}
