"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/FormField";
import { useContactForm } from "@/hooks/useContactForm";

export function ContactForm() {
  const { formData, errors, isSubmitting, statusMessage, updateField, handleSubmit } =
    useContactForm();

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4" aria-label="Contact form">
      <FormField id="name" label="Name" error={errors.name}>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          autoComplete="name"
        />
      </FormField>

      <FormField id="email" label="Email" error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          autoComplete="email"
        />
      </FormField>

      <FormField id="subject" label="Subject" error={errors.subject}>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
      </FormField>

      <FormField id="message" label="Message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          rows={5}
        />
      </FormField>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>

      {statusMessage && (
        <p role="status" className="text-sm text-muted-foreground">
          {statusMessage}
        </p>
      )}
    </form>
  );
}
