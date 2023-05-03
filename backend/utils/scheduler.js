const { clearReceivingUserDaily } = require("../controller/adminController");

//? cron expression for 12:00 AM, Everyday
const cronExp = "0 0 * * *";

//? cron expression for every minute -> DEV PUPROSE
// const cronExp = "* * * * *";

const functionCall = () => {
  clearReceivingUserDaily();
};

module.exports = {
  cronExp,
  functionCall,
};
