"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import { ALLOWED_EMAIL } from "@/lib/auth";

type AuthState = {
  isAuthenticated: boolean;
  email: string | null;
  isLoading: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  email: null,
  isLoading: false,
  signIn: () => {},
  signOut: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

const SESSION_KEY = "agentic_auth_email";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(SESSION_KEY);
    }
    return null;
  });

  const isAuthenticated = useMemo(() => {
    return email === ALLOWED_EMAIL;
  }, [email]);

  const signIn = useCallback((inputEmail: string) => {
    if (inputEmail.toLowerCase() === ALLOWED_EMAIL.toLowerCase()) {
      const normalized = inputEmail.toLowerCase();
      sessionStorage.setItem(SESSION_KEY, normalized);
      setEmail(normalized);
    }
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setEmail(null);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, email, isLoading: false, signIn, signOut }),
    [isAuthenticated, email, signIn, signOut]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
