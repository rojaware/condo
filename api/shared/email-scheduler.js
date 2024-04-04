let cron = require('node-cron');
const MailService = require("../controllers/mail-service");

/** 
 * The cron format consists of:
  *    *    *    *    *    *
  ┬    ┬    ┬    ┬    ┬    ┬
  │    │    │    │    │    │
  │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
  │    │    │    │    └───── month (1 - 12)
  │    │    │    └────────── day of month (1 - 31)
  │    │    └─────────────── hour (0 - 23)
  │    └──────────────────── minute (0 - 59)
  └───────────────────────── second (0 - 59, OPTIONAL)
  check database once in a day (12 am) and send email if due days is up
 */
function startCron() {
  console.log('Run email job at 11:59 PM every day.');
  cron.schedule('59 23 * * *', () => {
    // Send e-mail
    sendMail();
  });
}

async function sendMail() {
  const service = new MailService();
  const response = await service.sendMail(
    "leesungki@gmail.com",
    "My first email",
    "This mail was sent from my cool NodeJs service"
  );

  if (response.error) {
    console.log("Something went wrong", response.error);
    return;
  } else if (response.status === "SUCCESS") {
    console.log("Message sent");
  }
};


module.exports = {
  startCron: startCron
}
