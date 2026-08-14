export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  errors?: ContactFormErrors;
}
