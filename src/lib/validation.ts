import { z } from "zod";
import type { ContactFormData, ContactFormErrors } from "@/types/contact";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be under 100 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required.")
    .max(150, "Subject must be under 150 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be under 5000 characters."),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

export function validateContactForm(
  data: ContactFormData
): ContactFormErrors {
  const result = contactFormSchema.safeParse(data);
  if (result.success) return {};

  const errors: ContactFormErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ContactFormData | undefined;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}

export function isContactFormValid(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length === 0;
}
