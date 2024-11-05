const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = (email, token) => {
    const url = `http://localhost:5000/api/auth/verify/${token}`;

    transporter.sendMail({
        to: email,
        subject: 'Email Verification',
        html: `Click <a href="${url}">here</a> to verify your email.`
    }, (err, info) => {
        if (err) {
            console.log('Error sending email:', err);
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
};

module.exports = { sendVerificationEmail };
