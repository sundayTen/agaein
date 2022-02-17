import { knex } from '../../database';
import { readAccessToken } from '../../../common/auth/jwtToken';

const crawlingQueries = {
    crawlingResults: async (_: any, args: any) => {
        const dummyCrawlingResult = {
            rank: 1,
            type: "강아지",
            breed: "푸들",
            location: "서울 성북구",
            name: "뚱이",
            gender: "수컷",
            age: "3살",
            foundDate: "2021-12-12",
            createdDate: "2021-12-12",
            site: "http://www.angel.or.kr/view.php?code=dog&number=47011",
            keywords: ["목걸이", "스크래치", "곰돌이컷"]
        }
        const dummyCrawlingResult2 = {
            rank: 2,
            type: "강아지",
            breed: "미니어처 핀셔",
            location: "서울 도봉구",
            name: "뚱이",
            gender: null,
            age: null,
            foundDate: "2022-01-12",
            createdDate: "2022-02-09",
            site: "http://www.angel.or.kr/view.php?code=dog&number=47106",
            keywords: ["활발함", "작음"]
        }

        return [dummyCrawlingResult, dummyCrawlingResult2];
    },
    crawlingHistory: async (_: any, args: any, context: any) => {
        let userId;
        if (context.req.headers.authorization && context.req.headers.authorization.split(' ')[1]) {
            const jwtToken = readAccessToken(context.req.headers.authorization.split(' ')[1]);
            userId = (<any>jwtToken).userId;
        }

        const user = await knex('user').where('id', userId).first();

        const dummyCrawlingResult = {
            rank: 1,
            type: "강아지",
            breed: "푸들",
            location: "서울 성북구",
            name: "뚱이",
            gender: "수컷",
            age: "3살",
            foundDate: "2021-12-12",
            createdDate: "2021-12-12",
            site: "http://www.angel.or.kr/view.php?code=dog&number=47011",
            keywords: ["목걸이", "스크래치", "곰돌이컷"]
        }
        const dummyCrawlingResult2 = {
            rank: 2,
            type: "강아지",
            breed: "미니어처 핀셔",
            location: "서울 도봉구",
            name: "뚱이",
            gender: null,
            age: null,
            foundDate: "2022-01-12",
            createdDate: "2022-02-09",
            site: "http://www.angel.or.kr/view.php?code=dog&number=47106",
            keywords: ["활발함", "작음"]
        }

        return [{
            id: 1,
            user: user,
            crawlingKeywords: {breedId: "1", lostDate: "2022-02-11", location: {lat: 1.1, lng: 1.1, address: "test"}},
            crawlingResults: [dummyCrawlingResult, dummyCrawlingResult2]
        }];
    }
};

export default crawlingQueries;
