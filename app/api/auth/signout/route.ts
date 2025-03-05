import { NextResponse } from "next/server";

export async function POST() {
  // Create a JSON response
  const response = NextResponse.json({ message: "Signed out" });
  // Clear the cookies by setting them to empty strings with maxAge = 0
  response.cookies.set("id_token", "", {
    path: "/",
    maxAge: 0,
  });
  response.cookies.set("access_token", "", {
    path: "/",
    maxAge: 0,
  });
  return response;
}
