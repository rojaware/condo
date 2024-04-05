let cron = require('node-cron');
const MailService = require("../controllers/mail-service");
const config = require('../config.json');
const settingController = require('../controllers/setting-controller');
const BATCH = 'BATCH';

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
  console.log(config);
  settingController.getSettingByName(BATCH).then(result => {
    if (!result) {
      console.log("no data...");    
    } else {
      let hh = 23;
      let mm = 59;
      const alerts = result[0];
      const item = alerts.find(element => (element.viewValue === 'Hour'));
      hh = item.value;
      const _item = alerts.find(element => (element.viewValue === 'Minute'));
      mm = _item.value;
      console.log('hh=>'+ hh + ' mm=>' + mm);
      cron.schedule(`${mm} ${hh} * * *`, () => {
        // Send e-mail if today is 70 days away toward lease end date
        sendMail();
      });
    }
  })
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
