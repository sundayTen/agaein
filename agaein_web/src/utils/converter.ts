import { Breed_Type, Gender } from 'graphql/generated/generated';

/**
 * Gender enum을 한글로 변환합니다.
 * @param { Gender } gender male | female | unknown
 * @returns { string } 수컷 | 암컷 | 모름
 */
function convertGender(gender: Gender): string {
    switch (gender) {
        case 'male':
            return '수컷';
        case 'female':
            return '암컷';
        case 'unknown':
            return '모름';
        default:
            break;
    }
    return '모름';
}

/**
 * Breed Type enum을 한글로 변환합니다.
 * @param { Breed_Type } type : DOG | CAT | ETC
 * @returns { string } 개 | 고양이 | 기타
 */
function convertAnimalType(type: Breed_Type): string {
    switch (type) {
        case 'DOG':
            return '개';
        case 'CAT':
            return '고양이';
        case 'ETC':
            return '기타';
        default:
            break;
    }
    return '기타';
}

export { convertGender, convertAnimalType };
