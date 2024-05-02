import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

export const SendEmail = async (data) => {
  const { email, template, url, subject } = data;
  if (!email || !template || !url || !subject) {
    console.log('missing required fields');
  }

  const file = `src/utils/mailTemplate/${template}.hbs`;
  const source = fs.readFileSync(file, 'utf8');
  const templateFile = handlebars.compile(source);

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    // secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const html = templateFile(data);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html,
  };

  const mail = transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return err;
    } else {
      return info;
    }
  });
  return mail;
};
