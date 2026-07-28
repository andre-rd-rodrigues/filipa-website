import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/newsletter/route";

const endpoint = "http://localhost/api/newsletter";

function request(body: unknown): Request {
  return new Request(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function expectJson(
  response: Response,
  status: number,
  body: unknown,
): Promise<void> {
  expect(response.status).toBe(status);
  await expect(response.json()).resolves.toEqual(body);
}

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    vi.stubEnv("KIT_API_KEY", "kit-secret");
    vi.stubEnv("KIT_FORM_ID", "form/with spaces");
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns 500 without calling Kit when server configuration is missing", async () => {
    vi.stubEnv("KIT_API_KEY", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      request({ email: "filipa@example.com", consentimento: true }),
    );

    await expectJson(response, 500, {
      ok: false,
      error: "server_misconfigured",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(
      new Request(endpoint, { method: "POST", body: "{" }),
    );

    await expectJson(response, 400, { ok: false, error: "invalid_body" });
  });

  it.each([
    ["a missing email", undefined],
    ["a non-string email", 42],
    ["an incomplete email", "filipa@example"],
  ])("rejects %s", async (_, email) => {
    const response = await POST(request({ email, consentimento: true }));

    await expectJson(response, 400, { ok: false, error: "invalid_email" });
  });

  it("requires explicit consent", async () => {
    const response = await POST(
      request({ email: "filipa@example.com", consentimento: "true" }),
    );

    await expectJson(response, 400, {
      ok: false,
      error: "consent_required",
    });
  });

  it("trims the email and completes the two-step Kit flow in order", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 201 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      request({ email: "  filipa@example.com  ", consentimento: true }),
    );

    await expectJson(response, 200, { ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "https://api.kit.com/v4/subscribers",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Kit-Api-Key": "kit-secret",
        },
        body: JSON.stringify({
          email_address: "filipa@example.com",
          state: "inactive",
        }),
      }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://api.kit.com/v4/forms/form%2Fwith%20spaces/subscribers",
      expect.objectContaining({
        body: JSON.stringify({ email_address: "filipa@example.com" }),
      }),
    );
  });

  it("returns 502 and stops when subscriber creation fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response("Kit rejected", { status: 422 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      request({ email: "filipa@example.com", consentimento: true }),
    );

    await expectJson(response, 502, {
      ok: false,
      error: "subscribe_failed",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns 502 when adding the subscriber to the form fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 201 }))
      .mockResolvedValueOnce(new Response("Form rejected", { status: 409 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      request({ email: "filipa@example.com", consentimento: true }),
    );

    await expectJson(response, 502, {
      ok: false,
      error: "subscribe_failed",
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("returns 502 when the Kit request throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    const response = await POST(
      request({ email: "filipa@example.com", consentimento: true }),
    );

    await expectJson(response, 502, {
      ok: false,
      error: "subscribe_failed",
    });
  });
});
