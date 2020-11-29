const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/stocks.db');

/**
 * 
 * @param {StocksIpoEstimator.stockIpo} stock 
 */
function insertStock(stock) {
    const sql = `INSERT INTO ipos(lastYearRptDt,lastYearEPS, time, symbol, name, marketCap, fiscalQuarterEnding, epsForecast, noOfEsts) 
    SELECT 
        '${stock.lastYearRptDt}','${stock.lastYearEPS}', '${stock.time}', 
        '${stock.symbol}', '${stock.name}', '${stock.marketCap}', 
        '${stock.fiscalQuarterEnding}', '${stock.epsForecast}', '${stock.noOfEsts}'
    WHERE NOT EXISTS(SELECT 1 FROM ipos WHERE symbol = '${stock.symbol}' AND fiscalQuarterEnding = '${stock.fiscalQuarterEnding}');`
    db.run(sql);
}

function insertPriceTarget(StockPriceTarget) {
    const sql = `INSERT INTO price_target(symbol, mean, median, highest, lowest, numberOfEstimates) 
    SELECT 
        '${StockPriceTarget.symbol}','${StockPriceTarget.priceTargets.mean}',
        '${StockPriceTarget.priceTargets.median}', '${StockPriceTarget.priceTargets.highest}',
        '${StockPriceTarget.priceTargets.lowest}', '${StockPriceTarget.priceTargets.numberOfEstimates}',
        WHERE NOT EXISTS(SELECT 1 FROM price_target WHERE symbol = '${StockPriceTarget.symbol}');`
    db.run(sql);
}

module.exports = {
    insertStock: insertStock,
    insertPriceTarget: insertPriceTarget
}