const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxcfcda662b36f4b4f801cf963ae808fcc.mailgun.org'; // أدخل النطاق الخاص بك هنا
const mg = mailgun({ apiKey: '8081c9af82fe71c8eef81d430f6282be-72e4a3d5-22ddbf80', domain: DOMAIN });

// دالة لإرسال رسالة إلى طالب معين
async function sendEmailToStudent(email, message) {
    const data = {
        from: 'saeedhasan430@gmail.com', // استبدلها ببريدك المسجل في Mailgun
        to: email,
        subject: 'رسالة من النادي',
        text: message,
    };

    return new Promise((resolve, reject) => {
        mg.messages().send(data, (error, body) => {
            if (error) {
                console.error("error in sending massages", error);
                reject(error);
            } else {
                console.log("sending successful!", email);
                resolve(body);
            }
        });
    });
}

// دالة لإرسال رسالة جماعية لجميع الطلاب
async function sendEmailToAllStudents(emails, message) {
    const data = {
        from: 'YOUR_EMAIL@example.com',
        to: emails.join(','),
        subject: 'رسالة من النادي',
        text: message,
    };

    return new Promise((resolve, reject) => {
        mg.messages().send(data, (error, body) => {
            if (error) {
                console.error("حدث خطأ أثناء إرسال الرسائل:", error);
                reject(error);
            } else {
                console.log("تم إرسال الرسائل بنجاح إلى جميع الطلاب");
                resolve(body);
            }
        });
    });
}

module.exports = { sendEmailToStudent, sendEmailToAllStudents };
