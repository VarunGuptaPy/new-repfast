"use client";

import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
export function Navbar() {
  const router = useRouter();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-primary/10"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Twitter className="h-6 w-6" />
              <span className="text-xl font-bold">RepFast</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="hidden md:inline-flex"
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </Button>
            <Button onClick={() => router.push("/auth/signup")}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
