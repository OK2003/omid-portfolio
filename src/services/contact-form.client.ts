import type {
  ContactFormData,
  ContactSubmissionResult,
} from "@/types/contact";
import { SITE_CONFIG } from "@/constants/site";

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  const subject = encodeURIComponent(data.subject);
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
  );

  window.location.href = `mailto:${SITE_CONFIG.links.email}?subject=${subject}&body=${body}`;

  return {
    success: true,
    message: "Your email client has been opened with the message ready to send.",
  };
}
