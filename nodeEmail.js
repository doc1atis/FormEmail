const nodemailer = require("nodemailer");

function sendEmail(sender, senderName, receiver, textToBeSent, res) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: process.env.FORM_EMAIL
    }
  });

  let mailOptions = {
    from: sender,
    to: receiver,
    subject: `This email came from ${senderName}`,
    text: textToBeSent
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      res.render("index", { message: err });
      console.log(err);
    } else {
      res.render("index", {
        message: "Thank you for using our service",
        header: "Email sent Successfully!!!!",
        classy: "alert-success"
      });
      console.log(`Email sent: ${info.response}`);
    }
  });
}

module.exports = sendEmail;
