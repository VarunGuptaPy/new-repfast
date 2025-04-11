"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "sonner";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [learned, setLearned] = useState(false);
  const [replyCount, setReplyCount] = useState<number>(1); // New state for number picker input

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "unauthenticated") {
        router.push("/");
        return;
      }

      if (status === "authenticated" && session?.user?.id) {
        try {
          setIsLoading(true);
          const userDocRef = doc(db, "users", session.user.id);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            console.log("User data fetched:", data);
            setUserData(data);

            if (data.status === "learned") {
              setLearned(true);
            }
          } else {
            console.log("No user document found!");
            toast.error("User data not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user data");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [status, session, router]);

  const handleCreateProfile = async () => {
    if (!session?.user?.id) {
      toast.error("User session not found");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("/api/twitter-profile-info", {
        username: session.user.username,
        userId: session.user.id,
      });

      if (response.data.success) {
        toast.success("Profile created successfully");
        // Refresh user data
        const userDocRef = doc(db, "users", session.user.id);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
          setLearned(userDocSnap.data().status === "learned");
        }
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Failed to create profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetrain = () => {
    console.log("Retrain profile with replies:", replyCount);
    // Implement retraining logic here
    toast.info("Retraining started");
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
              ) : learned ? (
                // New UI for when learned is true
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 transition-all duration-300"
                    onClick={handleRetrain}
                  >
                    Retrain Your Profile
                  </Button>
                  <p className="text-muted-foreground">
                    Wanna retrain your profile? Adjust the number of posts &
                    replies:
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <input
                      type="number"
                      value={replyCount}
                      min="1"
                      className="w-20 border rounded p-2"
                      onChange={(e) => setReplyCount(Number(e.target.value))}
                    />
                    <Button onClick={handleRetrain} className="ml-2">
                      Start Replying
                    </Button>
                  </div>
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
