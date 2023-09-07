const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('db/stocks.db',  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, 
(err) => { 
   console.log(err);
});

const DATATYPES = {
    'INTEGER': 'INTEGER',
    'TEXT': 'TEXT',
    'BLOB': 'BLOB',
    'REAL': 'REAL',
    'NUMERIC': 'NUMERIC'
}

const TableBuilder = (table_name, fields, primaryKeyFields) => {
    let str = 'CREATE TABLE ' + table_name + '(';
    str += Object.keys(fields).map(k => k + ' ' + fields[k]).join(',');
    if (primaryKeyFields && Array.isArray(primaryKeyFields) && primaryKeyFields.length > 0) {
        str += ' ,UNIQUE(' + primaryKeyFields.join(',') + ')';
    }
    str += ')';
    return str;
}

function isTableExist(table_name, cb) {
    db.serialize(function () {
        db.run(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table_name}';`, function (err, row) {
            console.log(row);
            cb(typeof row === 'undefined')
        });
        ;
    });
}
function createTables() {
    isTableExist('price_target', function (isExist) {
        if (isExist) {
            db.serialize(function () {
                db.run(TableBuilder('price_target', {
                    symbol: DATATYPES.TEXT,
                    mean: DATATYPES.INTEGER, 
                    median: DATATYPES.INTEGER, 
                    highest: DATATYPES.INTEGER, 
                    lowest: DATATYPES.INTEGER, 
                    numberOfEstimates: DATATYPES.INTEGER
                }, ['symbol']));

            })
        } else {
            console.log('table ipos exist');
        }
    });

    isTableExist('ipos', function (isExist) {
        if (isExist) {
            db.serialize(function () {
                db.run(TableBuilder('ipos', {
                    "time": DATATYPES.TEXT,
                    "symbol": DATATYPES.TEXT,
                    "name": DATATYPES.TEXT,
                    "marketCap": DATATYPES.TEXT,
                    "fiscalQuarterEnding": DATATYPES.TEXT,
                    "epsForecast": DATATYPES.TEXT,
                    "noOfEsts": DATATYPES.INTEGER,
                    "lastYearRptDt": DATATYPES.TEXT,
                    "lastYearEPS": DATATYPES.TEXT
                }, ['symbol', 'fiscalQuarterEnding']));

            })
        } else {
            console.log('table ipos exist');
        }
    });
}

createTables();
// db.close();
module.exports = createTables;