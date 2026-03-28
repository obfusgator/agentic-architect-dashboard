import { TOTP } from "otpauth";
import { ALLOWED_EMAIL } from "./auth";

const TOTP_SECRET_LABEL = "agentic-dashboard-2fa";

export function generateTOTPSecret(): string {
  const totp = new TOTP({
    issuer: "AgenticDashboard",
    label: TOTP_SECRET_LABEL,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: TOTP.generateRandomSecret(20),
  });
  return totp.toString().split("=")[1];
}

export function verifyTOTP(secret: string, token: string): boolean {
  try {
    const normalizedSecret = secret.toUpperCase().replace(/[^A-Z2-7]/g, "");
    const totp = new TOTP({
      issuer: "AgenticDashboard",
      label: TOTP_SECRET_LABEL,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: normalizedSecret,
    });
    const delta = totp.validate({ token, window: 1 });
    return delta !== null;
  } catch {
    return false;
  }
}

export function getTOTPUri(secret: string, email: string): string {
  const normalizedSecret = secret.toUpperCase().replace(/[^A-Z2-7]/g, "");
  const totp = new TOTP({
    issuer: "AgenticDashboard",
    label: email.split("@")[0],
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: normalizedSecret,
  });
  return totp.toString();
}

export function isValidEmail(email: string): boolean {
  return email.toLowerCase() === ALLOWED_EMAIL.toLowerCase();
}
