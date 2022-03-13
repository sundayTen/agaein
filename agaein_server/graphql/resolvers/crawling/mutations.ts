import { readAccessToken } from '../../../common/auth/jwtToken';
import { knex } from '../../database';

const crawlingMutations = {
    crawling: async (_: any, args: any, context: any) => {
        let userId = 1;
        if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            userId = (<any>jwtToken).userId;
        }

        const { baseInfo, type } = args;
        const { breedId, lostDate, location, name, age, gender, keywords } = baseInfo;

        const breed = await knex('breed').where('id', breedId).first();

        const results = await knex(`crawling_${type.toLowerCase()}_result`)
            .where('type', breed.type)
            .andWhere('found_date', '>=', lostDate)
            .orderBy('found_date', 'desc');

        const filteredResults = results.filter((result: any) => {
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

        const crawling_histories = await knex('crawling_history').insert(history).returning('*');

        return crawling_histories[0].id;
    },
};

export default crawlingMutations;
