import { getCsrfToken } from "@/_lib/getCsrfToken";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookies = req.headers.get("cookie");
  // retrieve CSRF token from server
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
    const response = await fetch(`${process.env.SERVER_BASE_URL}/auth/signIn`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies,
        "X-XSRF-TOKEN": csrfToken,
      },
      credentials: "include",
    });
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to sign in" },
        { status: response.status }
      );
    }
    const setCookieHeader = response.headers.get("set-cookie");
    const data = await response.json();
    const accessToken = data.accessToken;
    const userDecoded = jwtDecode(accessToken);
    const res = NextResponse.json({ ...data, user: userDecoded });
    res.headers.append("Set-Cookie", setCookieHeader);
    return res;
  } catch (error) {
    console.error("Error signing in:", error.message);
    return NextResponse.json(
      { message: "Internal server error while signing in" },
      { status: 500 }
    );
  }
}
