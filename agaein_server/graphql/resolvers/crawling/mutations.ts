import { ApolloError } from 'apollo-server-errors';
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

        // @TODO orderby date
        const results = await knex(`crawling_${type.toLowerCase()}_result`)
            .where('type', breed.type)
            .andWhere('found_date', '>=', lostDate);

        

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
                for (let idx = 0; idx < filteredResults[i].keywords.length - keyword.length + 1; idx++) {
                    let cnt = 0;
                    for (let idx2 = 0; idx2 < keyword.length; idx2++) {
                        if (keyword[idx2] == filteredResults[i].keywords[idx + idx2]) {
                            cnt += 1;
                        }
                    }

                    if (cnt === keyword.length) {
                        filteredKeywords.push(keyword);
                        score += 3;
                        break;
                    }
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

            scores[i] += score;
        }

        // @TODO 위치기반 크롤링 점수 만들기. 15, 10, 5

        // @TODO 품종에 대한 비교를 어떻게 할까? 5

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
                    return mappedResult;
                }),
            },
        };

        const crawling_histories = await knex('crawling_history').insert(history).returning('*');

        return crawling_histories[0].id;
    },
};

export default crawlingMutations;
