const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendPasswordResetEmail(toEmail, resetToken) {
  const resetUrl = `https://blisslandingbc.com/reset-password?token=${resetToken}`;

  await resend.emails.send({
    from: 'Bliss Landing <noreply@blisslandingbc.com>',
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
