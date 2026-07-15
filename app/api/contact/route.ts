// POST /api/contact — receives the contact form payload and sends it as a
// formatted HTML email to sibanye.specialneeds@gmail.com via Nodemailer.
//
// The "from" address is set to EMAIL_USER (the Gmail account) because Gmail
// requires the sender to be the authenticated account. The submitter's email
// goes into the replyTo field so hitting Reply in Gmail goes back to them.
//
// Requires EMAIL_USER and EMAIL_PASS (a Gmail app password, not the account password)
// in .env.local. Generate an app password at myaccount.google.com → Security → App passwords.

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, phone, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: "sibanye.specialneeds@gmail.com",
    replyTo: email,
    subject: subject
      ? `Contact Form: ${subject}`
      : `Contact Form: Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #0369a1; margin-bottom: 4px;">New Contact Form Submission</h2>
        <p style="color: #6b7280; font-size: 13px; margin-top: 0;">Sibanye Centre For Special Needs — Website</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; width: 100px; vertical-align: top;">Name</td>
            <td style="padding: 8px 0; color: #111827; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Email</td>
            <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #0369a1;">${email}</a></td>
          </tr>
          ${
            phone
              ? `<tr>
            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Phone</td>
            <td style="padding: 8px 0; color: #111827;">${phone}</td>
          </tr>`
              : ""
          }
          ${
            subject
              ? `<tr>
            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Subject</td>
            <td style="padding: 8px 0; color: #111827;">${subject}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Message</td>
            <td style="padding: 8px 0; color: #111827; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          You can reply directly to this email to reach ${name} at ${email}.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
