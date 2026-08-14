import "server-only";

export interface EmailMessage {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}

export interface EmailSendResult {
  success: boolean;
  providerMessageId?: string;
  error?: string;
}

export interface EmailProvider {
  send(message: EmailMessage): Promise<EmailSendResult>;
}

export class ConsoleEmailProvider implements EmailProvider {
  async send(message: EmailMessage): Promise<EmailSendResult> {
    console.info("[email:console] would send email", {
      to: message.to,
      subject: message.subject,
    });
    return { success: true, providerMessageId: "console-noop" };
  }
}

export class ResendEmailProvider implements EmailProvider {
  constructor(private readonly apiKey: string) {}

  async send(message: EmailMessage): Promise<EmailSendResult> {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: message.from,
          to: [message.to],
          reply_to: message.replyTo,
          subject: message.subject,
          text: message.text,
          html: message.html,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        return { success: false, error: errorBody };
      }

      const data = (await response.json()) as { id?: string };
      return { success: true, providerMessageId: data.id };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export class SendGridEmailProvider implements EmailProvider {
  constructor(private readonly apiKey: string) {}

  async send(message: EmailMessage): Promise<EmailSendResult> {
    try {
      const response = await fetch(
        "https://api.sendgrid.com/v3/mail/send",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: message.to }] }],
            from: { email: message.from },
            reply_to: message.replyTo
              ? { email: message.replyTo }
              : undefined,
            subject: message.subject,
            content: [
              { type: "text/plain", value: message.text },
              ...(message.html
                ? [{ type: "text/html", value: message.html }]
                : []),
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        return { success: false, error: errorBody };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export class SmtpEmailProvider implements EmailProvider {
  async send(): Promise<EmailSendResult> {
    return {
      success: false,
      error:
        "SmtpEmailProvider is a stub. Implement using nodemailer and ensure the API route runs on the Node.js runtime.",
    };
  }
}

export function getEmailProvider(): EmailProvider {
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) return new ResendEmailProvider(resendKey);

  const sendGridKey = process.env.SENDGRID_API_KEY;
  if (sendGridKey) return new SendGridEmailProvider(sendGridKey);

  if (process.env.SMTP_HOST) return new SmtpEmailProvider();

  return new ConsoleEmailProvider();
}
