const fs = require('fs');

const today = new Date();
const date = today.getDate().toLocaleString();
const convertedDate = date.length === 1 ? '0' + date : date;
const todayWithFormatDate = `${today.getFullYear()}-${today.getMonth() + 1}-${convertedDate}`;

const updateLastMod = (path) =>
    fs.readFileSync(path, { encoding: 'utf-8' }).replace(/\d{4}-\d{2}-\d{0,2}/g, todayWithFormatDate);

const writeSiteMap = async (map) => {
    await fs.promises.writeFile('./sitemap.xml', map, {
        encoding: 'utf-8',
    });
};

writeSiteMap(updateLastMod('./sitemap.xml'));
