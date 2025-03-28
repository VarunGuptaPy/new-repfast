"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProfile = async () => {
    setIsLoading(true);
    // TODO: Add profile creation logic
    // For now, just simulate loading
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome to Your RepFast Dashboard
              </h2>
              <p className="text-muted-foreground mb-8">
                Get started by creating your RepFast profile. This will allow us
                to understand your engagement style and preferences.
              </p>
              {isLoading ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                  <p className="text-primary font-medium">
                    Creating your profile... Please don't close this page.
                  </p>
                </div>
              ) : (
                <Button
                  size="lg"
                  onClick={handleCreateProfile}
                  className="bg-primary hover:bg-primary/90 transition-all duration-300"
                >
                  Create Your RepFast Profile
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
