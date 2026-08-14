import type {
  ContactFormData,
  ContactSubmissionResult,
  ContactApiResponse,
} from "@/types/contact";

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const body = (await response.json()) as ContactApiResponse;

    return {
      success: body.success,
      message: body.message,
    };
  } catch {
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
