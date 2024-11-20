import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export async function POST(req) {
  // getting CSRF token
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

  // generating verification token
  const accessToken = req?.cookies?.get("accessToken");
  const session = jwtDecode(accessToken.value);
  const generateTokenResponse = await fetch(
    `${process.env.SERVER_BASE_URL}/auth/verify/generate-token?email=${session.sub}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        Cookie: cookies,
        "X-XSRF-TOKEN": csrfToken,
      },
    }
  );
  if (!generateTokenResponse.ok) {
    return NextResponse.json(
      { message: "Failed to create entity" },
      { status: generateTokenResponse.status }
    );
  }
  const verificationToken = await generateTokenResponse.text();

  // sending verification token to user
  try {
    const sendingEmailResponse = await fetch(
      `${process.env.SERVER_BASE_URL}/auth/verify/send-email?toEmail=${session.sub}&token=${verificationToken}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          Cookie: cookies,
          "X-XSRF-TOKEN": csrfToken,
        },
      }
    );
    if (!sendingEmailResponse.ok) {
      return NextResponse.json(
        { message: "Failed to update entity" },
        { status: response.status }
      );
    }
    const sendingEmailData = await sendingEmailResponse.json();
    return NextResponse.json({
      ...sendingEmailData,
      status: sendingEmailData.status ?? sendingEmailResponse.status,
    });
  } catch (error) {
    console.error("Error updating entity:", error.message);
    return NextResponse.json(
      { message: "Internal server error while updating entity" },
      { status: 500 }
    );
  }
}
