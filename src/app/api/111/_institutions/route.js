import { NextResponse } from "next/server";

export async function GET(req) {
  const accessToken = req?.cookies?.get("accessToken");
  const searchParams = req?.nextUrl?.searchParams;
  const {
    asList,
    simple,
    type,
    page = 0,
    size = 5,
  } = Object.fromEntries(searchParams.entries());
  try {
    // fetch tags as list
    if (asList) {
      if (simple) {
        return await handleGetAllAsSimpleList();
      }
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

async function handleGetAll(accessToken, pageNo, listSize) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/institutions?page=${pageNo}&size=${listSize}`,
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
      { message: "Failed to fetch institutions" },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}

async function handleGetAllAsList(accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/institutions?asList=true`,
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
      { message: "Failed to fetch institutions" },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}

async function handleGetAllAsSimpleList() {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/institutions/simple`,
  );
  if (!response.ok) {
    console.log("picto API !response.ok: ", response.statusText);
    if (response.status == 401) {
      // TODO: create logic
    }
    return NextResponse.json(
      { message: "Failed to fetch institutions" },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}
