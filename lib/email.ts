// lib/email.ts
import { Resend } from "resend";

// Prevent build crash if env var is missing
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_123456789");

const FROM = process.env.RESEND_FROM_EMAIL || "contact@bygrowflow.com";
const TO = process.env.RESEND_TO_EMAIL || "hello@bygrowflow.com";

interface InquiryEmailData {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

export async function sendInquiryNotification(data: InquiryEmailData) {
  await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: data.email,
    subject: `New Inquiry from ${data.name} — ${data.company}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0D0D0D; color: #F2F2F2; padding: 32px; border-radius: 12px;">
        <h1 style="color: #C8FF00; font-size: 24px; margin-bottom: 8px;">New Project Inquiry</h1>
        <p style="color: #888; margin-bottom: 32px;">You received a new inquiry via your ByGrowflow website.</p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #888; width: 120px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #F2F2F2;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #888;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #F2F2F2;"><a href="mailto:${data.email}" style="color: #C8FF00;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #888;">Company</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #F2F2F2;">${data.company}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #888;">Budget</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #F2F2F2;">${data.budget}</td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <p style="color: #888; margin-bottom: 8px;">Brief</p>
          <p style="color: #F2F2F2; background: #151515; padding: 16px; border-radius: 8px; border: 1px solid #1F1F1F; line-height: 1.6;">${data.message}</p>
        </div>

        <p style="color: #888; margin-top: 32px; font-size: 12px;">Sent from ByGrowflow website contact form</p>
      </div>
    `,
  });
}

export async function sendInquiryConfirmation(data: InquiryEmailData) {
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `Got your message — I'll be in touch soon, ${data.name.split(" ")[0]}!`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0D0D0D; color: #F2F2F2; padding: 32px; border-radius: 12px;">
        <h1 style="color: #C8FF00; font-size: 24px; margin-bottom: 8px;">Thanks for reaching out!</h1>
        <p style="color: #F2F2F2; line-height: 1.7;">
          Hey ${data.name.split(" ")[0]},<br/><br/>
          Your inquiry came through. I'll review your brief and get back to you within 24 hours.<br/><br/>
          In the meantime, feel free to book a free discovery call directly:
        </p>
        <a href="https://calendly.com/bygrowflow/discovery" style="display: inline-block; background: #C8FF00; color: #0D0D0D; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none; margin-top: 16px;">Book a Free Call →</a>
        <p style="color: #888; margin-top: 32px; font-size: 12px;">— ByGrowflow | Short-form video that moves brands forward</p>
      </div>
    `,
  });
}
