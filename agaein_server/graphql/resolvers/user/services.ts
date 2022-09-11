import { getRandomNickname } from '../../../common/utils/nickname';
import { Date, ImageForm, Optional, Upload, UserForm } from '../../customTypes';
import { knex } from '../../database';

export async function getUserByKakaoId(kakaoId: string) {
    return await knex('user').where('kakao_id', kakaoId).first();
}

export async function getUserById(id: string) {
    return await knex('user').where('id', id).first();
}

export async function createUser(kakaoId: string) {
    const now: Date = new Date();
    const userForm: UserForm = {
        kakao_id: kakaoId,
        createdAt: now,
        updatedAt: now,
        nickname: getRandomNickname(),
    };

    return (await knex('user').insert(userForm).returning('*'))[0];
}

export async function updateUser(
    userId: number,
    email: Optional<string>,
    nickname: Optional<string>,
    phoneNumber: Optional<string>,
) {
    const userForm: UserForm = {
        email: email,
        nickname: nickname,
        phoneNumber: phoneNumber,
        updatedAt: new Date(),
    };

    return (await knex('user').update(userForm).where('id', userId).returning('*'))[0];
}

export async function updateProfileImage(stream: Upload, userId: number, mimetype: string) {
    const filename: string = 'profile' + '_' + userId + '_' + Date.now() + '.' + mimetype.split('/')[1];
    const imageForm: ImageForm = {
        userId,
        url: 'https://www.agaein.com/file/image/' + filename,
    };

    await knex('image').insert(imageForm);

    const out: Upload = require('fs').createWriteStream('image/' + filename);
    await stream.pipe(out);
    await stream.on('close', () => {
        console.log(`${new Date()} store ${filename}`);
    });

    return imageForm.url;
}
