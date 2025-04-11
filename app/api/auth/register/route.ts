import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

export async function POST(req: Request) {
  try {
    const { email, password, twitterHandle } = await req.json();

    // Validation
    if (!email || !password || !twitterHandle) {
      return NextResponse.json(
        { message: "Email, password, and Twitter handle are required" },
        { status: 400 }
      );
    }

    // Normalize Twitter handle (remove @ if present)
    const normalizedHandle = twitterHandle.startsWith("@")
      ? twitterHandle.substring(1)
      : twitterHandle;

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Generate a user ID (you might want to use UUID or similar)
    const userId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);

    // Store user in Firebase
    await setDoc(doc(db, "users", userId), {
      id: userId,
      email,
      twitterHandle: normalizedHandle,
      password: hashedPassword, // Note: In production, consider using a dedicated auth provider
      createdAt: new Date().toISOString(),
      status: "new",
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 }
    );
  }
}
