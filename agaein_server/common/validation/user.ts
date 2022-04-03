import { ApolloError } from 'apollo-server-errors';

function isValidatedName(name: any) {
    if (name === undefined) {
        return false;
    }

    if (name.length < 1) {
        return false;
    }

    return true;
}

function isValidatedKakaoId(kakaoId: any) {
    if (kakaoId.length < 1) {
        return false;
    }

    return true;
}

function isValidatedEmail(email: any) {
    const regexValidation = /^[0-9a-zA-Z]{1,100}@[0-9a-zA-Z-]{1,100}[.][0-9a-zA-Z]{1,10}$/;

    if (email === undefined) {
        return false;
    }

    if (!regexValidation.test(email)) {
        return false;
    }

    return true;
}

function isValidatedPassword(password: any) {
    if (password === undefined) {
        return false;
    }

    if (password.length !== 64) {
        return false;
    }

    return true;
}

export function isValidatedSignup(user: any) {
    if (!isValidatedName(user.name)) {
        return false;
    }

    if (user.kakao_id && !isValidatedKakaoId(user.kakao_id)) {
        return false;
    }

    if (!isValidatedEmail(user.email)) {
        return false;
    }

    if (!isValidatedPassword(user.password)) {
        return false;
    }

    return true;
}

export function validateLogin(kakaoId: String) {
    // @TODO 밸리데이션 변경 요망 - 로그인 바꿀 때 같이.
    if (kakaoId.length < 6) {
        throw new ApolloError('isNotValidated', 'BAD_USER_INPUT');
    }
}


export function validatePassword(pw: String) {
    // @TODO 밸리데이션 변경 요망 - 로그인 바꿀 때 같이.
    if (pw != process.env.LOGIN_PW) {
        throw new ApolloError('isNotValidated', 'BAD_USER_INPUT');
    }
}
