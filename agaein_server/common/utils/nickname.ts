export function getRandomNickname() {
    const number = new Date().getMilliseconds() % 15;

    const adjective = [
        '작은',
        '거대한',
        '꾸안꾸',
        '마지막에 남은',
        '홀로선',
        '외로운',
        '구걸하는',
        '규칙없는',
        '날아다니는',
        '굴러다니는',
        '미움받는',
        '걱정하는',
        '폰만 보는',
        '사랑받는',
        '노래하는',
    ];
    const noun = [
        '허수아비',
        '발바닥',
        '노루',
        '부엉이',
        '치타',
        '강아지',
        '얼룩말',
        '임금님',
        '박쥐',
        '망둥어',
        '잉어',
        '자라',
        '백댄서',
        '가수',
        '배우',
    ];
    return adjective[number] + " " + noun[number];
}
