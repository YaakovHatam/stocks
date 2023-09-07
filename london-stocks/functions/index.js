const functions = require("firebase-functions");
const airTableApi = require("./modules/airtable-update");

exports.scheduledFunctionCrontab = functions.pubsub.schedule("30 17 * * *")
   .timeZone("Europe/London").onRun((context) => {
      const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/London" }));
      console.log('the date in London is:', d);
      const n = d.getDay();
      if (n > 0 && n < 6) {
         return airTableApi.updateDailyData();
      } else return null;
   });

exports.updateRecommendationsMonthly = functions.pubsub.schedule("30 17 3 * *")
   .timeZone("Europe/London").onRun((context) => {
      return airTableApi.updateRecommendations();

   });
