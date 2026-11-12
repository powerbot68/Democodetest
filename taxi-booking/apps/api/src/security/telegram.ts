import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verify Telegram Mini App initData on the backend.
 * Pass the raw initData string from Telegram.WebApp.initData.
 * Never accept a Telegram user ID supplied separately by the browser.
 */
export function verifyTelegramInitData(
  initData: string,
  botToken: string,
  maxAgeSeconds = 86_400
): { valid: boolean; user?: Record<string, unknown> } {
  if (!initData || !botToken) return { valid: false };

  const params = new URLSearchParams(initData);
  const receivedHash = params.get("hash");
  const authDate = Number(params.get("auth_date"));
  if (!receivedHash || !Number.isFinite(authDate)) return { valid: false };
  if (Math.floor(Date.now() / 1000) - authDate > maxAgeSeconds) return { valid: false };

  params.delete("hash");
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = createHmac("sha256", "WebAppData").update(botToken).digest();
  const expectedHash = createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
  const a = Buffer.from(expectedHash, "hex");
  const b = Buffer.from(receivedHash, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { valid: false };

  let user: Record<string, unknown> | undefined;
  const rawUser = params.get("user");
  if (rawUser) {
    try { user = JSON.parse(rawUser) as Record<string, unknown>; }
    catch { return { valid: false }; }
  }
  return { valid: true, user };
}
