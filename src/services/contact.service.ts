import "server-only";

import type { ContactFormSchema } from "@/lib/validation";
import type { ContactSubmissionResult } from "@/types/contact";
import { getEmailProvider, type EmailMessage } from "@/services/email.service";
import { SITE_CONFIG } from "@/constants/site";

export async function processContactSubmission(
  data: ContactFormSchema
): Promise<ContactSubmissionResult> {
  const provider = getEmailProvider();

  const message: EmailMessage = {
    to: SITE_CONFIG.links.email,
    from: `Portfolio Contact Form <noreply@${getDomain(SITE_CONFIG.url)}>`,
    replyTo: data.email,
    subject: `[Portfolio] ${data.subject}`,
    text: buildPlainTextBody(data),
  };

  const result = await provider.send(message);

  if (!result.success) {
    return {
      success: false,
      message: "We couldn't send your message right now. Please try again later.",
    };
  }

  return {
    success: true,
    message: "Thanks for reaching out - I'll get back to you soon.",
  };
}

function buildPlainTextBody(data: ContactFormSchema): string {
  return [
    `New contact form submission`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    ``,
    `Message:`,
    data.message,
  ].join("\n");
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "example.com";
  }
}
