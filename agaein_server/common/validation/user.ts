import { argsToArgsConfig } from 'graphql/type/definition';

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

export function isValidatedLogin(user: any) {
    if (!isValidatedEmail(user.email)) {
        return false;
    }

    if (!isValidatedPassword(user.password)) {
        return false;
    }

    return true;
}
