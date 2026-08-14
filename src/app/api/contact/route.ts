import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { processContactSubmission } from "@/services/contact.service";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import type { ContactApiResponse, ContactFormErrors } from "@/types/contact";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const identifier = getClientIdentifier(request.headers);
  const rateLimit = checkRateLimit(identifier, {
    limit: 5,
    windowMs: 60000,
  });

  if (!rateLimit.allowed) {
    const response: ContactApiResponse = {
      success: false,
      message: "Too many requests. Please try again in a minute.",
    };
    return NextResponse.json(response, {
      status: 429,
      headers: {
        "Retry-After": Math.ceil(
          (rateLimit.resetAt - Date.now()) / 1000
        ).toString(),
      },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    const response: ContactApiResponse = {
      success: false,
      message: "Invalid request body.",
    };
    return NextResponse.json(response, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const errors: ContactFormErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFormErrors | undefined;
      if (field && !errors[field]) {
        errors[field] = issue.message;
      }
    }

    const response: ContactApiResponse = {
      success: false,
      message: "Please correct the highlighted fields.",
      errors,
    };
    return NextResponse.json(response, { status: 422 });
  }

  try {
    const result = await processContactSubmission(parsed.data);
    const response: ContactApiResponse = {
      success: result.success,
      message: result.message,
    };
    return NextResponse.json(response, {
      status: result.success ? 200 : 502,
    });
  } catch (error) {
    console.error("[api/contact] unexpected error", error);
    const response: ContactApiResponse = {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
