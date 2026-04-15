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

async function sendWelcomeEmail(toEmail, name) {
  const firstName = name.split(' ')[0];
  await resend.emails.send({
    from: 'Bliss Landing <noreply@blisslandingbc.com>',
    to: toEmail,
    subject: 'Welcome to Bliss Landing!',
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #333;">
        <div style="background: rgba(35,80,85,1); padding: 32px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 1px;">Bliss Landing</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">British Columbia's hidden coastal gem</p>
        </div>
        <div style="background: #f9faf5; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
          <h2 style="color: rgba(35,80,85,1); margin: 0 0 16px;">Welcome, ${firstName}!</h2>
          <p style="line-height: 1.7; margin-bottom: 16px;">
            Thank you for joining the Bliss Landing community. You now have access to everything our site has to offer:
          </p>
          <ul style="line-height: 2; padding-left: 20px; color: #555;">
            <li>🌊 Live tide charts and weather forecasts</li>
            <li>🐋 Report and view whale &amp; dolphin sightings</li>
            <li>🎾 Reserve pickleball and tennis court times</li>
          </ul>
          <div style="text-align: center; margin-top: 28px;">
            <a href="https://blisslandingbc.com" style="background: rgba(35,80,85,1); color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px;">Visit the Site</a>
          </div>
          <p style="margin-top: 28px; font-size: 13px; color: #999; text-align: center;">
            If you didn't create this account, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  });
}

module.exports = { sendPasswordResetEmail, sendWelcomeEmail };
