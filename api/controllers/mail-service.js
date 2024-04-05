const nodemailer = require("nodemailer");
const config = require('../config.json');


class MailService {
  _transporter;

  constructor() {
    console.log('Reading config.json...')
    console.log(config)
    
    this._transporter = nodemailer.createTransport({
      host: config.alert.host,
      port: config.alert.port,
      secure: config.alert.secure,
      auth: {
        user: config.alert.auth.user,
        pass: config.alert.auth.pass,
      },
    });
  }

  async sendMail(recipient, subject, text) {
    console.log( 'sender user ==> ' + config.alert.auth.user)
    console.log( 'sender pass ==> ' + config.alert.auth.pass)
    const EMAIL = config.alert.auth.user;
    const mailOptions = {
      from: EMAIL,
      to: recipient,
      subject: subject,
      text: text,
    };

    try {
      console.log('sending mail ...' + JSON.stringify(mailOptions));
      await this._transporter.sendMail(mailOptions);
      return { status: "SUCCESS" };
    } catch (err) {
      return { error: err };
    }
  }
}

module.exports = MailService;