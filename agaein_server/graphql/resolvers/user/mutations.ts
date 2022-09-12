import { getAccessToken, getRefreshToken, getUserId } from '../../../common/auth/jwtToken';
import { validateLogin, validateLoginPassword } from '../../../common/validation/user';
import { Upload, UserResponse } from '../../customTypes';
import { MutationLoginArgs, MutationUpdateProfileArgs, MutationUpdateUserArgs } from '../../types';
import { createUser, getUserByKakaoId, updateProfileImage, updateUser } from './services';

const userMutations = {
    login: async (_: any, loginRequest: MutationLoginArgs) => {
        validateLogin(loginRequest.kakaoId);
        validateLoginPassword(loginRequest.pw);

        let user: UserResponse = await getUserByKakaoId(loginRequest.kakaoId);
        if (user === undefined) {
            user = await createUser(loginRequest.kakaoId);
        }

        user.accessToken = getAccessToken(user.id, user.kakaoId);
        user.refreshToken = getRefreshToken(user.id, user.kakaoId);

        return user;
    },
    updateUser: async (_: any, userUpdateRequest: MutationUpdateUserArgs, context: any) => {
        const userId: number = getUserId(context.req.headers.authorization);

        return await updateUser(
            userId,
            userUpdateRequest.email,
            userUpdateRequest.nickname,
            userUpdateRequest.phoneNumber,
        );
    },
    updateProfile: async (_: any, profileImage: MutationUpdateProfileArgs, context: any) => {
        const userId: number = getUserId(context.req.headers.authorization);
        const { createReadStream, mimetype } = await profileImage.file;
        const stream: Upload = createReadStream();

        return await updateProfileImage(stream, userId, mimetype);
    },
};

export default userMutations;
