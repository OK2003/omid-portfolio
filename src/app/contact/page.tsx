import { ContactForm } from "@/components/forms/ContactForm";
import { SITE_CONFIG } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Send a message using the form below, or reach out directly via{" "}
        <a
          href={`mailto:${SITE_CONFIG.links.email}`}
          className="underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
        >
          email
        </a>
        .
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </section>
  );
}
