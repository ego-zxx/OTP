const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 10000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
let uniqueOtp; // Declare otp as a global variable
let email;
function sendOtpEmail(){
    const transporter = nodemailer.createTransport({
        host: 'mail.jnpbank.com',
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@jnpbank.com',
            pass: 'JNPbank@2'
        }
    });

    const mailOptions = {
        from: 'noreply@jnpbank.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${uniqueOtp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Failed to send OTP');
        }
        console.log('Email sent:', info.response);
       
    });
}
app.post('/sendOTP', (req, res) => {
     email = req.body.email;
     uniqueOtp = req.body.code;

    if (!email) {
        return res.status(400).send('Email is required');
    }
   sendOtpEmail();  
   res.status(200).send('OTP sent successfully');
});

app.use(bodyParser.json());




app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
