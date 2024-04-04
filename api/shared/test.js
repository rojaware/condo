const MailService = require("../controllers/mail-service");
const http = require('http');

const service = new MailService();

const someFunction = async () => {
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

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain'});
});
someFunction();
server.listen(3000, '127.0.0.1')