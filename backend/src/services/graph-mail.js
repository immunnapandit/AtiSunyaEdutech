import { env, isGraphEmailConfigured } from "../config/env.js";

let cachedToken = null;
let tokenExpiresAt = 0;

export async function sendGraphMail({ to, subject, html, text, replyTo = [], from }) {
  if (!isGraphEmailConfigured()) {
    return { sent: false, skipped: true, reason: "Microsoft Graph email is not configured." };
  }

  const token = await getGraphAccessToken();
  const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(from || env.graph.fromEmail)}/sendMail`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: {
        subject,
        body: {
          contentType: html ? "HTML" : "Text",
          content: html || text
        },
        toRecipients: normalizeRecipients(to),
        ...(normalizeRecipients(replyTo).length > 0
          ? { replyTo: normalizeRecipients(replyTo) }
          : {})
      },
      saveToSentItems: true
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Microsoft Graph sendMail failed with ${response.status}: ${details}`);
  }

  return { sent: true, skipped: false };
}

async function getGraphAccessToken() {
  const now = Date.now();

  if (cachedToken && tokenExpiresAt - 60_000 > now) {
    return cachedToken;
  }

  const tokenUrl = `https://login.microsoftonline.com/${encodeURIComponent(env.graph.tenantId)}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: env.graph.clientId,
    client_secret: env.graph.clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials"
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Microsoft Graph token request failed with ${response.status}: ${details}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiresAt = now + Number(data.expires_in || 3599) * 1000;

  return cachedToken;
}

function normalizeRecipients(value) {
  const recipients = Array.isArray(value) ? value : [value];

  return recipients
    .filter(Boolean)
    .map((address) => ({
      emailAddress: { address }
    }));
}
