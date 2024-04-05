const nodeMailer = require("nodemailer");
const config = require('../config.json');


class MailService {
  _transporter;

  constructor() {
    console.log('Reading config.json...')
    console.log(config)
    
    const EMAIL = config.auth.user;
    const THIRD_PARTY_APP_PASSWORD = config.auth.pass;
    this._transporter = nodeMailer.createTransport({
      host: config.host,
      port: config.port,
      service: config.service,
      auth: {
        user: EMAIL,
        pass: THIRD_PARTY_APP_PASSWORD,
      },
    });
  }

  async sendMail(recipient, subject, text) {
    const mailOptions = {
      from: EMAIL,
      to: recipient,
      subject: subject,
      text: text,
    };

    try {
      console.log('sending mail ...')
      await this._transporter.sendMail(mailOptions);
      return { status: "SUCCESS" };
    } catch (err) {
      return { error: err };
    }
  }
}

module.exports = MailService;