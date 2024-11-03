const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxcfcda662b36f4b4f801cf963ae808fcc.mailgun.org'; // أدخل النطاق الخاص بك هنا
const mg = mailgun({ apiKey: '58488a48e4ae317d4b38ce84acf4f85a-72e4a3d5-a91a9685', domain: DOMAIN }); // استبدل YOUR_API_KEY بمفتاحك

// دالة لإرسال رسالة إلى طالب معين
async function sendEmailToStudent(email, message) {
    const data = {
        from: 'saeedhasan430@sandboxcfcda662b36f4b4f801cf963ae808fcc.mailgun.org', // بريد إلكتروني مسجل في Mailgun
        to: email,
        subject: 'رسالة من النادي',
        text: message,
    };

    try {
        const body = await mg.messages().send(data);
        console.log("Email sent successfully:", body);
    } catch (error) {
        console.error("Error in sending email:", error);
    }
}

// دالة لإرسال رسالة جماعية لجميع الطلاب
async function sendEmailToAllStudents(emails, message) {
    const data = {
        from: 'YOUR_EMAIL@example.com',
        to: emails.join(','),
        subject: 'رسالة من النادي',
        text: message,
    };

    try {
        const body = await mg.messages().send(data);
        console.log("Emails sent successfully:", body);
    } catch (error) {
        console.error("Error in sending emails:", error);
    }
}

module.exports = { sendEmailToStudent, sendEmailToAllStudents };
