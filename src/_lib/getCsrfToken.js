import { NextResponse } from "next/server";

export const getCsrfToken = async (cookies) => {
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
  return csrfData;
};
