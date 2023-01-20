const fs = require('fs');

const enhanceDateFormat = (d) => {
    const dateToString = String(d);
    if (dateToString.length === 1) {
        return '0' + dateToString;
    }
    return dateToString;
};

// 크론탭 실행 날짜 및 포매팅된 날짜.
const today = new Date();
const todayWithFormatDate = `${today.getFullYear()}-${enhanceDateFormat(today.getMonth() + 1)}-${enhanceDateFormat(
    today.getDate().toLocaleString(),
)}`;

const updateLastMod = (path) =>
    fs.readFileSync(path, { encoding: 'utf-8' }).replace(/\d{4}-\d{2}-\d{0,2}/g, todayWithFormatDate);

const writeSiteMap = async (map) => {
    await fs.promises.writeFile('./sitemap.xml', map, {
        encoding: 'utf-8',
    });
};

writeSiteMap(updateLastMod('./sitemap.xml'));
