// POST /api/contact — receives the contact form payload and sends it as a
// formatted HTML email to sibanye.specialneeds@gmail.com via Nodemailer.
//
// The "from" address is set to EMAIL_USER (the Gmail account) because Gmail
// requires the sender to be the authenticated account. The submitter's email
// goes into the replyTo field so hitting Reply in Gmail goes back to them.
//
// Requires EMAIL_USER and EMAIL_PASS (a Gmail app password, not the account password)
// in .env.local. Generate an app password at myaccount.google.com → Security → App passwords.
//
// Abuse protection:
//   - Rate limited to 5 submissions per IP per hour (Gmail free tier caps ~500/day).
//   - Hidden "company" honeypot field: real users never fill it; bots usually do.
//   - All user input is length-capped, HTML-escaped in the body, and stripped of
//     CR/LF in header fields to prevent HTML/header injection.

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  getClientIp,
  rateLimit,
  escapeHtml,
  sanitizeHeader,
  isValidEmail,
} from "@/app/lib/security";

const MAX_LEN = {
  name: 100,
  email: 254,
  phone: 40,
  subject: 150,
  message: 5000,
};

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!rateLimit("contact", ip, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many messages sent. Please try again later." },
      { status: 429 }
    );
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { name, email, phone, subject, message, hpField } = body;

  // Honeypot: a hidden field. Bots fill it, humans can't see it.
  // Pretend success so bots don't learn they were caught.
  if (hpField) {
    console.log("[contact] Honeypot triggered — no email sent. ip:", ip);
    return NextResponse.json({ success: true }, { status: 200 });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    (phone && typeof phone !== "string") ||
    (subject && typeof subject !== "string")
  ) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (
    name.length > MAX_LEN.name ||
    email.length > MAX_LEN.email ||
    (phone && phone.length > MAX_LEN.phone) ||
    (subject && subject.length > MAX_LEN.subject) ||
    message.length > MAX_LEN.message
  ) {
    return NextResponse.json(
      { error: "One or more fields are too long." },
      { status: 400 }
    );
  }

  // Header fields: strip CR/LF to prevent header injection.
  const safeName = sanitizeHeader(name, MAX_LEN.name);
  const safeSubject = subject ? sanitizeHeader(subject, MAX_LEN.subject) : "";

  // Body fields: HTML-escape so no markup/links can be injected into the email.
  const escName = escapeHtml(safeName);
  const escEmail = escapeHtml(email);
  const escPhone = phone ? escapeHtml(phone) : "";
  const escSubject = escapeHtml(safeSubject);
  const escMessage = escapeHtml(message);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${safeName}" <${process.env.EMAIL_USER}>`,
    to: "sibanye.specialneeds@gmail.com",
    replyTo: email,
    subject: safeSubject
      ? `Contact Form: ${safeSubject}`
      : `Contact Form: Message from ${safeName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #0369a1; margin-bottom: 4px;">New Contact Form Submission</h2>
        <p style="color: #6b7280; font-size: 13px; margin-top: 0;">Sibanye Centre For Special Needs — Website</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; width: 100px; vertical-align: top;">Name</td>
            <td style="padding: 8px 0; color: #111827; font-weight: 600;">${escName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Email</td>
            <td style="padding: 8px 0; color: #111827;"><a href="mailto:${escEmail}" style="color: #0369a1;">${escEmail}</a></td>
          </tr>
          ${
            escPhone
              ? `<tr>
            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Phone</td>
            <td style="padding: 8px 0; color: #111827;">${escPhone}</td>
          </tr>`
              : ""
          }
          ${
            escSubject
              ? `<tr>
            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Subject</td>
            <td style="padding: 8px 0; color: #111827;">${escSubject}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Message</td>
            <td style="padding: 8px 0; color: #111827; white-space: pre-wrap;">${escMessage}</td>
          </tr>
        </table>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          You can reply directly to this email to reach ${escName} at ${escEmail}.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(
      "[contact] Email sent. messageId:",
      info.messageId,
      "response:",
      info.response,
      "accepted:",
      info.accepted,
      "rejected:",
      info.rejected
    );
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
