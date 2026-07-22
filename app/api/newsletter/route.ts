import { NextResponse } from "next/server";

// Never cache: this always talks to Kit at request time.
export const dynamic = "force-dynamic";

const KIT_API_BASE = "https://api.kit.com/v4";

type Body = {
  email?: unknown;
  consentimento?: unknown;
};

function isValidEmail(value: string): boolean {
  // Deliberately loose — matches the client-side check (`includes("@")`)
  // while rejecting obviously empty / malformed input.
  return /.+@.+\..+/.test(value);
}

async function kitFetch(path: string, apiKey: string, body: unknown) {
  return fetch(`${KIT_API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify(body),
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    console.error(
      "Newsletter: missing KIT_API_KEY or KIT_FORM_ID environment variables.",
    );
    return NextResponse.json(
      { ok: false, error: "server_misconfigured" },
      { status: 500 },
    );
  }

  let payload: Body;
  try {
    payload = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_body" },
      { status: 400 },
    );
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const consentimento = payload.consentimento === true;

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 },
    );
  }

  if (!consentimento) {
    return NextResponse.json(
      { ok: false, error: "consent_required" },
      { status: 400 },
    );
  }

  try {
    // Kit v4 is a two-step flow: upsert the subscriber, then add to the form.
    // The subscriber must already exist before it can be added to a form.
    // `state: "inactive"` keeps them unconfirmed so the form's double opt-in
    // confirmation email gates the subscription (they become active only after
    // clicking the link). Requires the form's confirmation email to be enabled
    // with "Auto-confirm new subscribers" left unchecked in the Kit dashboard.
    const createRes = await kitFetch("/subscribers", apiKey, {
      email_address: email,
      state: "inactive",
    });

    if (!createRes.ok) {
      const detail = await createRes.text().catch(() => "");
      console.error(
        `Newsletter: Kit create-subscriber failed (${createRes.status}): ${detail}`,
      );
      return NextResponse.json(
        { ok: false, error: "subscribe_failed" },
        { status: 502 },
      );
    }

    const addRes = await kitFetch(
      `/forms/${encodeURIComponent(formId)}/subscribers`,
      apiKey,
      { email_address: email },
    );

    if (!addRes.ok) {
      const detail = await addRes.text().catch(() => "");
      console.error(
        `Newsletter: Kit add-to-form failed (${addRes.status}): ${detail}`,
      );
      return NextResponse.json(
        { ok: false, error: "subscribe_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Newsletter: unexpected error talking to Kit.", error);
    return NextResponse.json(
      { ok: false, error: "subscribe_failed" },
      { status: 502 },
    );
  }
}
