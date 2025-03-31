"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { getDate } from "date-fns";
export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [learned, setLearned] = useState(false)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    // Only try to fetch user data when session is loaded and authenticated
    if (status === "authenticated" && session?.user?.id) {
      getDoc(doc(db, "users", session.user.id))
        .then((res) => {
          setUserData(res.data());
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [status, session, router]);

  const handleCreateProfile = async () => {
    if (!session?.user?.id) return;

    try {
      setIsLoading(true);
      // await updateDoc(doc(db, "users", session.user.id), {
      //   status: "learning",
      // });

      await axios.post("/api/twitter-profile-info", {
        username: session.user.username,
        userId: session.user.id,
      });
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setIsLoading(false);
    }
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
                  onClick={async () => {
                    await handleCreateProfile();
                  }}
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
