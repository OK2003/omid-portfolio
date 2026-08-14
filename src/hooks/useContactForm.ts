"use client";

import { useState, useCallback } from "react";
import type {
  ContactFormData,
  ContactFormErrors,
} from "@/types/contact";
import { validateContactForm, isContactFormValid } from "@/lib/validation";
import { submitContactForm } from "@/services/contact-form.client";

const INITIAL_FORM_DATA: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const updateField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const validationErrors = validateContactForm(formData);
      setErrors(validationErrors);

      if (!isContactFormValid(validationErrors)) return;

      setIsSubmitting(true);
      setStatusMessage(null);

      const result = await submitContactForm(formData);

      setStatusMessage(result.message);
      if (result.success) {
        setFormData(INITIAL_FORM_DATA);
      }
      setIsSubmitting(false);
    },
    [formData]
  );

  return {
    formData,
    errors,
    isSubmitting,
    statusMessage,
    updateField,
    handleSubmit,
  };
}
