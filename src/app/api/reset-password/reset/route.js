import { getCsrfToken } from "@/_lib/getCsrfToken";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req?.nextUrl?.searchParams;
  const { token } = Object.fromEntries(searchParams.entries());
  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/reset-password`
  );
  response.cookies.set("reset-token", token, {
    httpOnly: true,
    secure: true,
    path: "/reset-password",
  });
  return response;
}

export async function POST(req) {
  const cookies = req.headers.get("cookie");
  const csrfData = await getCsrfToken(cookies);

  const csrfToken = csrfData.token;
  let requestBody;
  try {
    requestBody = await req.json(); // parse request body to apropriate format
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to parse request body" },
      { status: 400 }
    );
  }
  
  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/auth/reset-password/reset`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
          "X-XSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to refresh access-token" },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error refreshing access-token:", error.message);
    return NextResponse.json(
      { message: "Internal server error while refreshing token" },
      { status: 500 }
    );
  }
}
