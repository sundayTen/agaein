/**
 * 숫자 3자리마다 comma(,)를 찍어서 리턴합니다.
 * @param value
 * @returns {string}
 */
function numberWithComma(value: string): string {
    return value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export { numberWithComma };
