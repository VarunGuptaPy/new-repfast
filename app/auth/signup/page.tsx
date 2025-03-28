import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

import SignUpForm from "./sign-up-form";

export default function SignUpPage() {
  return <SignUpForm />;
}
