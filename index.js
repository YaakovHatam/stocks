const tipranksApi = require('tipranks-api-v2');
const nasdaqApi = require('./apis/nasdaq');
const dbAdapter = require('./infrastructure/data-access-layer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const MIN_RATIO = 1.01;

nasdaqApi.getEarningCalls('2020-12-15').then(ipoRes => {
    dataRows = ipoRes['data']['rows'].forEach(stockIpo => {
        dbAdapter.insertStock(stockIpo);
    });
});

function getStockPriceTarget(SYMBOL) {
    return tipranksApi.getPriceTargets(SYMBOL).catch(err => console.log(err));
}
getStockPriceTarget('CTAS').then(res => {
    dbAdapter.insertStock(res);
});
/*
getEarningCalls().then(data => {
   
    for(let i=0; i < dataRows.length && i <  1; i++) {
        const SYMBOL = dataRows[i].symbol;
        setTimeout(() => {
            getStockPrice(SYMBOL).then(stockPriceRes => {
                let $current = stockPriceRes;
                let $target = null;

                getStockPriceTarget(SYMBOL).then(res => {
                    $target = res;
                    // console.log(Number($current['05. price']), $target['priceTargets']['mean']);
                    $$curPrice = Number($current['Global Quote']['05. price']);
                    $$trgtPrice =  $target['priceTargets']['mean'];
                    const ratio = $$trgtPrice/$$curPrice;
                    if (ratio > MIN_RATIO) {
                        console.log(SYMBOL, $$curPrice ,$$trgtPrice);
                    }
                });
            })
        }, i * 13 * 1000)
    }
})



function getStockPrice(SYMBOL) {
    return fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${SYMBOL}&apikey=${process.env.alphavantageApi}`)
    .then(res => res.json());
}


*/
// tipranksApi.getNewsSentimentData('MU').then(result => console.log(result));
// tipranksApi.getTrendingStocks().then(trending => console.log(trending));