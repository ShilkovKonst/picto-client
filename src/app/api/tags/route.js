import { NextResponse } from "next/server";

export async function GET(req) {
  const accessToken = req?.cookies?.get("accessToken");
  const searchParams = req?.nextUrl?.searchParams;

  const asList = searchParams.get("asList");
  const page = searchParams.get("page") ?? 0;
  const size = searchParams.get("size") ?? 5;
  try {
    // fetch tags as list
    if (asList) {
      return await handleGetAllAsList(accessToken);
    }
    return await handleGetAll(accessToken, page, size);
  } catch (error) {
    console.error("Error fetching tags:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

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
  
  // send request to server with body, create new tag
  const accessToken = req?.cookies?.get("accessToken");
  const formData = await req.formData();
  try {
    const response = await fetch(`${process.env.SERVER_BASE_URL}/tags`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        Cookie: cookies,
        "X-XSRF-TOKEN": csrfToken,
      },
      credentials: "include",
    });
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to create tag" },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating category:", error.message);
    return NextResponse.json(
      { message: "Internal server error while creating category" },
      { status: 500 }
    );
  }
}

async function handleGetAll(accessToken, pageNo, listSize) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/tags?page=${pageNo}&size=${listSize}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    console.log("picto API !response.ok: ", response.statusText);
    if (response.status == 401) {
      // TODO: create logic
    }
    return NextResponse.json(
      { message: "Failed to fetch tags" },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}

async function handleGetAllAsList(accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/tags?asList=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    console.log("picto API !response.ok: ", response.statusText);
    if (response.status == 401) {
      // TODO: create logic
    }
    return NextResponse.json(
      { message: "Failed to fetch tags" },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}
