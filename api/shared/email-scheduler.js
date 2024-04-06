let cron = require('node-cron');
const moment = require('moment')
const MailService = require("../controllers/mail-service");
const config = require('../config.json');
const settingController = require('../controllers/setting-controller');
const propertyController = require('../controllers/property-controller');
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
  
  console.log(config);
  settingController.getSettingForAlert().then(alert => {
    if (!alert) {
      console.log("no data...");    
    } else {
      console.log(`Run email job at ${alert.hour}:${alert.minute} every day.`); 
      // cron.schedule(`* * * * *`, () => { // run every minute..
      cron.schedule(`${alert.minute} ${alert.hour} * * *`, () => {  
        // Send e-mail if today is 70 days away toward lease end date
        sendMail(alert);
      });
    }
  })
}

async function sendMail(alert) {
  // send mail if extended end date is blank, the diff days is less than input days (70 ie)
  propertyController.getPropertyLeaseEnding(alert.days).then(result => {
    if (!result) {
      console.log("no data...");
      throw new Error('404 not found');
    } else {
      properties = result[0];
      properties.forEach(async property => {
        if (!property.extendedEndDate && property.diff <= alert.days) {
          // send email alert...
          const title = `Alert on Lease on ${property.name}`;
          settingController.getLandlordEmail(property.owner).then( async ownerEmail => {
            const emails = ownerEmail? alert.subscriber + ',' + ownerEmail: alert.subscriber;
            const endDate = moment(property.endDate).format('YYYY-MM-DD');
            const body = `Lease on ${property.name} will end ${property.diff} days on ${endDate} `
            const service = new MailService();
            const response = await service.sendMail(
              emails,
              title,
              body
            );
          
            if (response.error) {
              console.log("Alert Email :: Something went wrong", response.error);
              return;
            } else if (response.status === "SUCCESS") {
              console.log("Alert Email Message sent");
            }       
          });
   
        }
      });      
    }
  });
};

module.exports = {
  startCron: startCron
}
