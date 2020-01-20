const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = text => `
    <div className="Email" style="
        border: 1px solid black;
        padding:20px;
        font-famiily: sans-serif;
        line-height: 2;
        font-size: 20px;
        ">
        <h2>Hello Jesus! </h2>
        <p>${text}</p>
        <p> 🍪, Gzuz</p>
    </div>
`;
exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
