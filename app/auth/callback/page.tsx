"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const storedState = localStorage.getItem("twitter_oauth_state");

      // Verify state to prevent CSRF attacks
      if (!state || state !== storedState) {
        console.error("Invalid state");
        router.push("/auth/signin?error=invalid_state");
        return;
      }

      // Clear stored state
      localStorage.removeItem("twitter_oauth_state");

      if (code) {
        // Here you would typically exchange the code for an access token
        // Since we're using static export, you'll need to handle this in your backend service
        // For now, we'll just redirect to the home page
        router.push("/");
      } else {
        router.push("/auth/signin?error=no_code");
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing login...</h2>
        <p className="text-muted-foreground">
          Please wait while we complete your authentication.
        </p>
      </div>
    </div>
  );
}
