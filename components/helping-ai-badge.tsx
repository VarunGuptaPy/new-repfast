"use client";

import { Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function HelpingAiBadge() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://helpingai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 bg-primary/10 hover:bg-primary/20 p-3 rounded-full transition-colors duration-200 border border-primary/20 hover:border-primary/30"
            aria-label="Powered by HelpingAI"
          >
            <Sparkles className="w-6 h-6 text-primary" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Powered by HelpingAI</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}