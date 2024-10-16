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
    console.log("requestBody from sign up api route", requestBody)
    const response = await fetch(`${process.env.SERVER_BASE_URL}/auth/signUp`, {
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
        { message: "Failed to create user, this email is already in use" },
        { status: response.status }
      );
    }    
    const data = await response.json()

    return NextResponse.json(data);

  } catch (error) {
    console.error("Error creating user:", error.message);
    return NextResponse.json(
      { message: "Internal server error while creating user" },
      { status: 500 }
    );
  }
}
