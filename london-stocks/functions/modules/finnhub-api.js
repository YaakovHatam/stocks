const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "bu76rin48v6rajd4sul0";
const finnhubClient = new finnhub.DefaultApi();


function InvestorOwnership() {
   let optsLimit = { 'limit': 10 };
   finnhubClient.investorsOwnership("AAPL", optsLimit, (error, data, response) => {
      console.log(data)
   });
}

function NewsSentiment() {
   finnhubClient.newsSentiment("AAPL", (error, data, response) => {
      console.log(data)
   });
}

function PriceTarget(stockSymbol, cb) {
   finnhubClient.priceTarget(stockSymbol, (error, data, response) => {
      if (error) cb(error)
      else cb(null, data)
   });
}

function Quote() {
   finnhubClient.quote("AAPL", (error, data, response) => {
      console.log(data)
   });
}

function RecommendationTrends() {
   finnhubClient.recommendationTrends("AAPL", (error, data, response) => {
      console.log(data)
   });
}

function StockDividends() {
   finnhubClient.stockDividends("KO", "2019-01-01", "2020-06-30", (error, data, response) => {
      console.log(data)
   });
}

function SupportResistance() {
   finnhubClient.supportResistance("AAPL", "D", (error, data, response) => {
      console.log(data)
   });
}


module.exports = {
   PriceTarget: PriceTarget
}