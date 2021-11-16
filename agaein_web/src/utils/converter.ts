import { Board_Type, Breed_Type, Gender } from 'graphql/generated/generated';

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

const getTitle = (boardType: Board_Type) => {
    switch (boardType) {
        case Board_Type.Lfp:
            return '실종동물 찾아요';
        case Board_Type.Lfg:
            return '주인을 찾아요';
        case Board_Type.Review:
            return '베스트 후기';
        default:
            return '잘못된 데이터';
    }
};

export { convertGender, convertAnimalType, getTitle };
