const fs = require('fs');

const today = new Date();
const todayWithFormatDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

const updateLastMod = (path) =>
    fs.readFileSync(path, { encoding: 'utf-8' }).replace(/\d{4}-\d{2}-\d{0,2}/g, todayWithFormatDate);

const writeSiteMap = async (map) => {
    await fs.promises.writeFile('./sitemap.xml', map, {
        encoding: 'utf-8',
    });
};

writeSiteMap(updateLastMod('./sitemap.xml'));
