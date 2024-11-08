const axios = require('axios');

// ضع هنا API Token الخاص بك من Mailtrap
const API_TOKEN = 'c8b67ad7dde15a0fb3720d512b9a2115';
const MAILTRAP_INBOX_ID = 'YOUR_INBOX_ID';

// دالة لإرسال بريد إلكتروني إلى طالب معين أو إلى جميع الطلاب
async function sendEmail(recipients, subject, text) {
    const url = `https://send.api.mailtrap.io/api/send`;
    const toRecipients = recipients.map(email => ({
        email: email,
        name: 'Student'
    }));

    const data = {
        from: {
            email: 'hello@demomailtrap.com', // البريد الإلكتروني للمرسل
            name: 'saeed hassan'
        },
        to: toRecipients,             // قائمة بالمستلمين
        subject: subject,             // موضوع الرسالة
        text: text                    // محتوى الرسالة
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Email sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending email:', error.response ? error.response.data : error.message);
    }
}

module.exports = { sendEmail };
