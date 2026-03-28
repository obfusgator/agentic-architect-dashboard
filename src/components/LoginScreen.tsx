"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { AUTH_CONFIG, ALLOWED_EMAIL } from "@/lib/auth";
import { verifyTOTP, getTOTPUri, isValidEmail } from "@/lib/totp";
import QRCodeLib from "qrcode";

const TOTP_SECRET_KEY = "agentic_totp_secret";
const TOTP_SETUP_KEY = "agentic_totp_setup_complete";

type Step = "email" | "totp" | "setup" | "success";

export function LoginScreen() {
  const { signIn } = useAuth();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const checkSetupStatus = useCallback(() => {
    if (typeof window === "undefined") return false;
    const secret = localStorage.getItem(TOTP_SECRET_KEY);
    return secret !== null;
  }, []);

  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    setIsSetup(checkSetupStatus());
  }, [checkSetupStatus]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Access denied. This dashboard is restricted.");
      return;
    }

    if (!isSetup) {
      const secret = Array.from({ length: 20 }, () => 
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"[Math.floor(Math.random() * 32)]
      ).join("");
      
      localStorage.setItem(TOTP_SECRET_KEY, secret);
      const uri = getTOTPUri(secret, email);
      const qrDataUrl = await QRCodeLib.toDataURL(uri);
      setQrCodeUrl(qrDataUrl);
      setStep("setup");
    } else {
      setStep("totp");
    }
  };

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (totpCode.length !== 6 || !/^\d+$/.test(totpCode)) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    const secret = localStorage.getItem(TOTP_SECRET_KEY) || "";
    if (verifyTOTP(secret, totpCode)) {
      localStorage.setItem(TOTP_SETUP_KEY, "true");
      signIn(email);
      setStep("success");
    } else {
      setError("Invalid code. Please try again from your authenticator app.");
    }
  };

  const handleTotpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (totpCode.length !== 6 || !/^\d+$/.test(totpCode)) {
      setError("Please enter a valid 6-digit code");
      setIsLoading(false);
      return;
    }

    const secret = localStorage.getItem(TOTP_SECRET_KEY) || "";
    if (verifyTOTP(secret, totpCode)) {
      signIn(email);
      setStep("success");
    } else {
      setError("Invalid code. Please try again.");
    }
    setIsLoading(false);
  };

  const handleBack = () => {
    if (step === "setup") {
      localStorage.removeItem(TOTP_SECRET_KEY);
    }
    setStep("email");
    setEmail("");
    setTotpCode("");
    setError("");
    setQrCodeUrl("");
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 card-grid-bg opacity-30" aria-hidden />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-panel rounded-2xl p-8 shadow-[0_0_60px_rgba(168,85,247,0.4)]">
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-amber-300 shadow-[0_0_30px_rgba(168,85,247,0.55)] mb-4" />
            <h1 className="text-2xl font-bold text-white text-center">
              {AUTH_CONFIG.siteTitle}
            </h1>
            <p className="text-sm text-white/60 mt-2 text-center">
              Two-Factor Authentication Required
            </p>
          </div>

          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm text-amber-200 mb-2">
                  Google Workspace Email
                </label>
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-xl bg-purple-600/20 blur" />
                  <div className="relative flex items-center gap-2 rounded-xl border border-purple-500/40 bg-black/60 px-4 py-3">
                    <svg className="w-5 h-5 text-purple-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                    </svg>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={ALLOWED_EMAIL}
                      className="w-full bg-transparent text-white placeholder-purple-900 outline-none"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full relative group"
              >
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 blur opacity-70 group-hover:opacity-100 transition duration-500" />
                <div className="relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] transition-all">
                  Continue
                </div>
              </button>
            </form>
          )}

          {step === "setup" && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 mb-4">
                  <svg className="w-6 h-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Set Up Google Authenticator</h2>
                <p className="text-sm text-white/60 mb-4">
                  Scan this QR code with your Google Authenticator app
                </p>
              </div>

              {qrCodeUrl && (
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white rounded-xl">
                    <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                  </div>
                </div>
              )}

              <form onSubmit={handleSetupSubmit} className="space-y-4">
                <div>
                  <label htmlFor="setupCode" className="block text-sm text-amber-200 mb-2">
                    Enter 6-digit code from app
                  </label>
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-xl bg-purple-600/20 blur" />
                    <input
                      id="setupCode"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      value={totpCode}
                      onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="000000"
                      className="w-full rounded-xl border border-purple-500/40 bg-black/60 px-4 py-3 text-center text-2xl tracking-[0.5em] text-white placeholder-purple-900 outline-none"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full relative group"
                >
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 blur opacity-70 group-hover:opacity-100 transition duration-500" />
                  <div className="relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                    Verify & Complete Setup
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full text-center text-sm text-white/60 hover:text-white/80 transition"
                >
                  Back
                </button>
              </form>
            </div>
          )}

          {step === "totp" && (
            <form onSubmit={handleTotpSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 mb-3">
                  <svg className="w-6 h-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-sm text-white/60">
                  Welcome back, {email.split("@")[0]}
                </p>
              </div>

              <div>
                <label htmlFor="totpCode" className="block text-sm text-amber-200 mb-2">
                  Enter 6-digit code from Google Authenticator
                </label>
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-xl bg-purple-600/20 blur" />
                  <input
                    id="totpCode"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="w-full rounded-xl border border-purple-500/40 bg-black/60 px-4 py-3 text-center text-2xl tracking-[0.5em] text-white placeholder-purple-900 outline-none"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group"
              >
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 blur opacity-70 group-hover:opacity-100 transition duration-500" />
                <div className="relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-50">
                  {isLoading ? (
                    <span className="animate-pulse">Verifying...</span>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Verify Code
                    </>
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="w-full text-center text-sm text-white/60 hover:text-white/80 transition"
              >
                Use different account
              </button>
            </form>
          )}

          {step === "success" && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4">
                <svg className="w-8 h-8 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-emerald-300">Authentication successful!</p>
              <p className="text-sm text-white/60 mt-2">Redirecting to dashboard...</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-xs text-white/40">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Protected by Google Authenticator 2FA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
