import { NextResponse } from "next/server";

export async function GET(req) {
  // console.log("from api csrf headers", req.headers)
  const cookies = req.headers.get('cookie');
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/csrf/token`,
    {
      method: "GET",
      headers: {
        "Cookie": cookies, 
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to fetch csrf-token" },
      { status: response.status }
    );
  }
  const data = await response.json();
  // console.log("csrfToken from api: ", data)
  return NextResponse.json(data);
}