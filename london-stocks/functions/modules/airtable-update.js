const fetch = require("node-fetch");
const Airtable = require("airtable");

const tableName = 'COVID affected stocks';
const viewName = 'Stocks grid view';
const apiKey = 'key7P9fPYwWOuaMJS';
const appid = 'appP3gAMlDkXRVnqk';
const base = new Airtable({ apiKey: apiKey }).base(appid);

function updateDailyData() {
   const updateTable = [];
   const baseTable = base(tableName);
   const columnName = "Yesterday’s close";
   return baseTable.select({
      pageSize: 50,
      view: viewName,
   }).firstPage().then((records) => {
      const promises = [];
      records.forEach(function (record) {
         promises.push(new Promise(async resolve => {
            const symbol = record.get("Symbol");
            const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}.L&token=bpul0uvrh5rd45tk1jrg`);
            const jRes = await res.json();
            console.log(symbol, record.get(columnName), jRes.c);
            if (jRes.c) {
               updateTable.push({
                  "id": record.id,
                  "fields": {
                     [columnName]: jRes.c
                  }
               });
            }
            resolve();
         }));
      });
      return Promise.all(promises);
   }).then(next => {
      console.log(updateTable);
      const SIZE = 10;
      let j = 0;
      let _arr = [];
      do {
         // take 10 in each iteration
         _arr = updateTable.slice(j * SIZE, ++j * SIZE);
         baseTable
            .update(_arr)
            .catch(err => console.log(err));

      } while (_arr.length === SIZE)

   }).catch(err => console.log(err));
};

function updateRecommendations() {
   const updateTable = [];
   const baseTable = base(tableName);
   const columnName = "Recommendation score";
   return baseTable.select({
      pageSize: 50,
      view: viewName,
   }).firstPage().then((records) => {
      const promises = [];
      records.forEach(function (record) {
         promises.push(new Promise(async resolve => {
            const symbol = record.get("Symbol");
            const res = await fetch(`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}.L&token=bpul0uvrh5rd45tk1jrg`);
            const jRes = await res.json();

            if (jRes[0]) {
               const calc = (jRes[0].buy || 0
                  + (jRes[0].strongBuy || 0) * 2
                  - jRes[0].sell || 0
                  - (jRes[0].strongSell || 0) * 2);
               console.log(symbol, record.get(columnName), calc);
               updateTable.push({
                  "id": record.id,
                  "fields": {
                     [columnName]: calc
                  }
               });
            } else {
               console.log('no recommendations for', symbol)
            }
            resolve();
         }));
      });
      return Promise.all(promises);
   }).then(next => {
      console.log(updateTable);
      const SIZE = 10;
      let j = 0;
      let _arr = [];
      do {
         // take 10 in each iteration
         _arr = updateTable.slice(j * SIZE, ++j * SIZE);
         baseTable
            .update(_arr)
            .catch(err => console.log(err));

      } while (_arr.length === SIZE)

   }).catch(err => console.log(err));
}

module.exports = {
   updateDailyData: updateDailyData,
   updateRecommendations: updateRecommendations
}