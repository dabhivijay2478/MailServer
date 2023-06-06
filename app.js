const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config({ path: "./Email.env" });
const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const FromEmail = process.env.MAIL_USERNAME;
  const Password = process.env.MAIL_PASSWORD;
  const Recipient_Email = process.env.Recipient_Email
  const { fullName, email, message } = req.body;


  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: FromEmail,
      pass: Password,
    },
  });

  let mailOptions = {
    from: FromEmail,
    to: Recipient_Email,
    subject: 'New message from your website',
    html: `
    <h4>New Message from your website</h4>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
