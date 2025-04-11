import axios from "axios";

interface ChatFunctionProps {
  systemPrompt: string;
  userQuery: string;
  maxTokens: number;
}

export async function chatFunction({ systemPrompt, userQuery, maxTokens}: ChatFunctionProps): Promise<string> {
  try {
    const res = await axios.post(
      "https://api.helpingai.co/v1/chat/completions",
      {
        model: "helpingai3-raw",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userQuery,
          },
        ],
        max_tokens: maxTokens,
      },
      {
        headers: {
          Authorization: "Bearer hl-191a2d01-ec27-4bd8-b43f-5533f10e1f43",
          "Content-Type": "application/json",
        },
        timeout: 5000,
      }
    );

    return res.data.choices[0].message.content;
  } catch (error: any) {
    console.error("Chat function error:", error);
    throw new Error(error.message || "Failed to get chat response");
  }
}

export default chatFunction;