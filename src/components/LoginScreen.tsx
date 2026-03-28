"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { AUTH_CONFIG } from "@/lib/auth";

export function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (email.toLowerCase() !== AUTH_CONFIG.allowedEmail.toLowerCase()) {
      setError("Access denied. This dashboard is restricted.");
      setIsLoading(false);
      return;
    }

    signIn(email);
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
              Secure access required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder={AUTH_CONFIG.allowedEmail}
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
              disabled={isLoading}
              className="w-full relative group"
            >
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 blur opacity-70 group-hover:opacity-100 transition duration-500" />
              <div className="relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] transition-all disabled:opacity-50">
                {isLoading ? (
                  <span className="animate-pulse">Verifying...</span>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                    </svg>
                    Sign in with Google
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/40">
            Access restricted to authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
}
