import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    return NextResponse.json({
      exists: userDoc.exists(),
    });
  } catch (error: any) {
    console.error("User check error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to check user" },
      { status: 500 }
    );
  }
}
