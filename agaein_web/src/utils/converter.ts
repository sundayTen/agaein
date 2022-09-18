import { Finding_Status } from './../graphql/generated/generated';
import { Board_Type, Breed_Type, Gender } from 'graphql/generated/generated';
import { numberWithComma } from './number';
const YEAR_TO_MONTH = 12;
const GRATUITY_UNIT = 10000;
/**
 * Gender enum을 한글로 변환합니다.
 * @param { Gender } gender male | female | unknown
 * @returns { string } 수컷 | 암컷 | 모름
 */
function convertGender(gender: Gender): string | null {
    switch (gender) {
        case Gender.Male:
            return '수컷';
        case Gender.Female:
            return '암컷';
        case Gender.Unknown:
            return null;
        default:
            break;
    }
    return null;
}

/**
 * Breed Type enum을 한글로 변환합니다.
 * @param { Breed_Type } type : DOG | CAT
 * @returns { string } 개 | 고양이
 */
function convertAnimalType(type: Breed_Type): string {
    switch (type) {
        case Breed_Type.Dog:
            return '강아지';
        case Breed_Type.Cat:
            return '고양이';
        default:
            break;
    }
    return '기타';
}

/**
 * 나이를 변환하여 표기합니다.
 * 1살 미만 -> 개월, 1살 이상 -> 살
 * @param {number} age 나이
 * @returns {string} 변환된 나이 + suffix
 */
function convertAge(age: number): string {
    if (age === undefined || age === 0) return '';
    if (age < YEAR_TO_MONTH) {
        return `${age}개월`;
    }
    return `${Math.floor(age / YEAR_TO_MONTH)}살`;
}

function convertStatus(status: Finding_Status) {
    if (status === Finding_Status.Finding) {
        return '진행중';
    }

    return '완료';
}

/**
 *
 * @param {number} gratuity 변환할 사례금
 * @returns {string} 만원 단위의 숫자
 */
function convertGratuity(gratuity: number): string | null {
    if (!gratuity || gratuity < GRATUITY_UNIT) return null;
    if (gratuity >= GRATUITY_UNIT ** 2) {
        return `${numberWithComma(`${Math.floor(gratuity / GRATUITY_UNIT ** 2)}`)}억`;
    }
    return `${numberWithComma(`${Math.floor(gratuity / GRATUITY_UNIT)}`)}만`;
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

export { convertGender, convertAnimalType, convertAge, convertGratuity, convertStatus, getTitle };
