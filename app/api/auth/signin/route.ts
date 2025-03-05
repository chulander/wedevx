import { NextResponse } from "next/server";
import { signinSchema, signin } from "@/utils/authTools";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = signinSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten() },
        { status: 400 },
      );
    }
    const { email, password } = result.data;

    const authResult = await signin({ email, password });
    if (!authResult) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const { access_token, id_token } = authResult;

    const response = NextResponse.json({ message: "Sign in successful" });
    response.cookies.set("access_token", access_token, {
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60,
    });
    response.cookies.set("id_token", id_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });
    return response;
  } catch (error: unknown) {
    console.error("Sign in error:", error);
    // If the error message indicates invalid credentials, return 401;
    // Otherwise, return a 500 for an unexpected error.
    if (error.message && error.message.includes("Invalid email or password")) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
