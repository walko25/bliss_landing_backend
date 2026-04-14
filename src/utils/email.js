const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendPasswordResetEmail(toEmail, resetToken) {
  const resetUrl = `https://blisslandingbc.com/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: `"Bliss Landing" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Reset your Bliss Landing password',
    html: `
      <p>You requested a password reset for your Bliss Landing account.</p>
      <p>Click the link below to set a new password. This link expires in 1 hour.</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you did not request this, you can safely ignore this email.</p>
    `,
  });
}

module.exports = { sendPasswordResetEmail };
