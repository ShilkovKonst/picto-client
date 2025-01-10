import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export async function GET(req) {
  // check if user ia already verified and redirect to dashboard if yes
  const accessToken = req?.cookies?.get("accessToken");
  const session = jwtDecode(accessToken.value);
  if (session.verified){
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/dashboard`
    );
  }

  // getting CSRF token
  const cookies = req.headers.get("cookie");
  // retrieve CSRF token from server
  const csrfTokenResponse = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/api/csrf`,
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

  const searchParams = req?.nextUrl?.searchParams;
  const { token } = Object.fromEntries(searchParams.entries());
  const verifyTokenResponse = await fetch(
    `${process.env.SERVER_BASE_URL}/auth/verify?token=${token}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        Cookie: cookies,
        "X-XSRF-TOKEN": csrfToken,
      },
    }
  );
  console.log("verify api route verifyTokenResponse", verifyTokenResponse);
  if (verifyTokenResponse.ok) {
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/dashboard?verify=success`
    );
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 0,
      sameSite: "none",
    });
    return response;
  } else {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/dashboard?verify=failure`
    );
  }
}
