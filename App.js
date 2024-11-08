const express = require('express');
const cors = require('cors');
const { sendEmail } = require('./sendEmail');
const app = express();
const PORT = 3000;

// قائمة الطلاب (للاختبار، يمكن استبدالها بمصدر قاعدة بيانات)
const studentsEmails = [
    'student1@example.com',
    'student2@example.com',
    'student3@example.com'
];

app.use(cors());
app.use(express.json());

// إرسال بريد إلكتروني إلى طالب معين أو إلى جميع الطلاب
app.post('/send-email', async (req, res) => {
    const { to, subject, text, allStudents } = req.body;
    const recipients = allStudents ? studentsEmails : [to]; // حدد قائمة المستلمين

    try {
        await sendEmail(recipients, subject, text);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send('Failed to send email');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
