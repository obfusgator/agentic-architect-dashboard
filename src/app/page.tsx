"use client";

import { useAuth } from "@/components/AuthProvider";
import { LoginScreen } from "@/components/LoginScreen";
import { DashboardContent } from "./DashboardContent";

function LoadingScreen() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 flex items-center justify-center">
      <div className="text-amber-200 animate-pulse">Initializing secure channel...</div>
    </div>
  );
}

function AuthenticatedPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <DashboardContent />;
}

export default AuthenticatedPage;
