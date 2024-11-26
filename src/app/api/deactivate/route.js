import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookies = req.headers.get("cookie");
  // retrieve CSRF token from server
  const csrfTokenResponse = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/csrf`,
    {
      method: "GET",
      headers: {
        Cookie: cookies,
      },
      credentials: "include",
    }
  );
  if (!csrfTokenResponse.ok) {
    return NextResponse.json(
      { message: "Failed to fetch csrf-token" },
      { status: csrfTokenResponse.status }
    );
  }
  const csrfData = await csrfTokenResponse.json();
  const csrfToken = csrfData.token;

  const accessToken = req?.cookies?.get("accessToken");
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
    const response = await fetch(`${process.env.SERVER_BASE_URL}/auth/deactivate`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
        Cookie: cookies,
        "X-XSRF-TOKEN": csrfToken,
      },
      credentials: "include",
    });
    console.log(response)
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to deactivate" },
        { status: response.status }
      );
    }
    const data = await response.json();
    const res = NextResponse.json(data);
    res.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 0, // remove cookie
      sameSite: 'none',
    });
    return res;

  } catch (error) {
    console.error("Error deactivating:", error.message);
    return NextResponse.json(
      { message: "Internal server error while deactivating" },
      { status: 500 }
    );
  }
}
