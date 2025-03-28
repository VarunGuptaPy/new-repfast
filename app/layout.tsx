import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import SessionWrapper from "./coomponent/sessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RepFast - Your 24/7 Social Media Response Agent",
  description:
    "Automate your social media engagement with AI-powered responses that learn from your style.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <SessionWrapper>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
          >
            {children}
          </ThemeProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}
