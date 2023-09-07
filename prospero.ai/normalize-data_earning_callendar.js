const fs = require('fs');
const data = fs.readFileSync('./data_earning_callendar/source/08-2023.html');
const os = require('os');
// html parser
const { JSDOM } = require('jsdom');
const dom = new JSDOM(data);
const allRows = dom.window.document.querySelectorAll('table tbody tr');

const normalizedData = Array.from(allRows).reduce((acc, curr) => {
    if (curr.hasAttribute('tablesorterdivider')) {
        const dateTetxt = curr.textContent.replace(/\n/g, '').trim();
        acc[dateTetxt] = [];
        acc.latestKey = dateTetxt;
    } else {
        acc[acc.latestKey].push({
            Ticker: curr.children[1].querySelector('a').textContent,
            ForecastEPS: curr.children[3].textContent.replace('/', '').trim(),
            ForecastRevenue: curr.children[5].textContent.replace('/', '').trim(),
            MarketCap: curr.children[6].textContent,
            Time: curr.children[7].getAttribute('data-value') === '1' ?
                'Before Market Open' : 'After Market Close',
        })
    }
    return acc;
}, {});

delete normalizedData.latestKey;
fs.writeFileSync('./data_earning_callendar/08-2023.json', JSON.stringify(normalizedData));

const csv = Object.keys(normalizedData).reduce((acc, curr) => {
    normalizedData[curr].forEach((item) => {
        acc.push(`${item.Ticker},${item.ForecastEPS},${item.ForecastRevenue},${item.MarketCap},${item.Time},${curr}\n`);
    });
    return acc;
}, []);
fs.writeFileSync('./data_earning_callendar/08-2023.csv', csv.join(''));