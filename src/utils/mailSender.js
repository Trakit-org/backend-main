import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendPasswordResetEmail = async (email, resetLink) => {
  const emailContent = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Password Reset Request",
    html: `
      <h1>Password Reset</h1>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };

  try {
    await transporter.sendMail(emailContent);
  } catch (error) {
    console.error("error sending reset email:", error);
    throw new Error("Failed to send reset email");
  }
};

export const sendReminderEmail = async (email, subject, html) => {
  const emailContent = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject,
    html
  };

  try {
    await transporter.sendMail(emailContent);
  } catch (error) {
    console.error("error sending reminder email:", error);
    throw new Error("Failed to send reminder email");
  }
};
