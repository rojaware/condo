const nodeMailer = require("nodemailer");

const EMAIL = "rojaware@yahoo.com";
const THIRD_PARTY_APP_PASSWORD = "qcnjlnuyiyqnqtqe";

class MailService {
  _transporter;

  constructor() {
    this._transporter = nodeMailer.createTransport({
      host: "smtp.mail.yahoo.com",
      port: 465,
      service: "yahoo",
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
      await this._transporter.sendMail(mailOptions);
      return { status: "SUCCESS" };
    } catch (err) {
      return { error: err };
    }
  }
}

module.exports = MailService;