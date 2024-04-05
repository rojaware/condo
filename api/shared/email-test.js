// Import the Nodemailer library
const nodemailer = require('nodemailer');

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use SSL
  auth: {
    user: 'leesungki@gmail.com',
    pass: 'tkbhcwrsiqilwmwh',
  }
});

// Email data
const mailOptions = {
  from: 'leesungki@gmail.com',
  to: 'leesungki@gmail.com',
  subject: 'Node.js Email Tutorial',
  text: 'This is a basic email sent from Node.js using Nodemailer.',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});