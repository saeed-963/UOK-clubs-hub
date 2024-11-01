const express = require('express');
const cors = require('cors');
const { sendEmailToStudent, sendEmailToAllStudents } = require('./sendEmail');
const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { email, message } = req.body;
  try {
    await sendEmailToStudent(email, message);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send email');
  }
});

app.post('/send-emails', async (req, res) => {
  const { emails, message } = req.body;
  try {
    await sendEmailToAllStudents(emails, message);
    res.status(200).send('Emails sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send emails');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
