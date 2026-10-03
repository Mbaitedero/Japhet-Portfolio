const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ownerEmail = "allahndiguimj@gmail.com";
const resendEndpoint = "https://api.resend.com/emails";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Partial<ContactPayload>;
  return Boolean(
    typeof payload.name === "string" &&
    payload.name.trim().length >= 1 &&
    payload.name.trim().length <= 120 &&
    typeof payload.email === "string" &&
    payload.email.trim().length >= 3 &&
    payload.email.trim().length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim()) &&
    typeof payload.message === "string" &&
    payload.message.trim().length >= 1 &&
    payload.message.trim().length <= 5000,
  );
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Méthode non autorisée." }, 405);
  }

  try {
    const payload: unknown = await request.json();
    if (!isValidPayload(payload)) {
      return jsonResponse({ error: "Les informations du formulaire sont invalides." }, 400);
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("[send-contact-email] RESEND_API_KEY is missing; notification not sent");
      return jsonResponse({ error: "Le service d’email n’est pas configuré." }, 500);
    }

    const name = payload.name.trim();
    const email = payload.email.trim();
    const message = payload.message.trim();
    const sentAt = new Date().toISOString();
    const from = "onboarding@resend.dev";
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
    const safeSentAt = escapeHtml(sentAt);

    const resendResponse = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [ownerEmail],
        reply_to: email,
        subject: `Nouveau message portfolio — ${name}`,
        html: `<h2>Nouveau message depuis le portfolio</h2><p><strong>Nom :</strong> ${safeName}</p><p><strong>Email :</strong> ${safeEmail}</p><p><strong>Message :</strong><br />${safeMessage}</p><p><strong>Date d’envoi :</strong> ${safeSentAt}</p>`,
      }),
    });

    if (!resendResponse.ok) {
      const errorDetails = await resendResponse.text();
      console.error("[send-contact-email] Resend rejected the notification", {
        status: resendResponse.status,
        details: errorDetails,
      });
      return jsonResponse({ error: "La notification n’a pas pu être envoyée." }, 502);
    }

    return jsonResponse({ sent: true });
  } catch {
    return jsonResponse({ error: "Une erreur est survenue pendant l’envoi des emails." }, 500);
  }
});
