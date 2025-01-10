import { getCsrfToken } from "@/_lib/getCsrfToken";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookies = req.headers.get("cookie");
  const csrfData = await getCsrfToken(cookies);
  const csrfToken = csrfData.token;

  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
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
    const setCookieHeader = response.headers.get("set-cookie");
    const data = await response.json();
    const res = NextResponse.json(data);
    res.headers.append("Set-Cookie", setCookieHeader);
    return res;
  } catch (error) {
    console.error("Error refreshing access-token:", error.message);
    return NextResponse.json(
      { message: "Internal server error while refreshing token" },
      { status: 500 }
    );
  }
}
