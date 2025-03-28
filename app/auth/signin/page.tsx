import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

import SignInForm from "./sign-in-form";

export default function SignInPage() {
  return <SignInForm />;
}
