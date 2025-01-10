import { getCsrfToken } from "@/_lib/getCsrfToken";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export async function POST(req) {
  // getting CSRF token
  const cookies = req.headers.get("cookie");
  // retrieve CSRF token from server
  const csrfData = await getCsrfToken(cookies);
  const csrfToken = csrfData.token;

  // generating verification token
  const accessToken = req?.cookies?.get("accessToken");
  const session = jwtDecode(accessToken.value);
  const verificationTokenRequest = {email: session.sub}
  const generateTokenResponse = await fetch(
    `${process.env.SERVER_BASE_URL}/auth/verify/generate-token`,
    {
      method: "POST",
      body: JSON.stringify(verificationTokenRequest),
      headers: {
        "Content-Type": "application/json",
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
  const body = {toEmail: session.sub, token: verificationToken}
  try {
    const sendingEmailResponse = await fetch(
      `${process.env.SERVER_BASE_URL}/auth/verify/send-email`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
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
