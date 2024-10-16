import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const getCsrfToken = async () => {
  try {
    const response = await fetch(
      `${process.env.CLIENT_API_BASE_URL}/api/csrf`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch CSRF token");
    }
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};

export async function GET(req) {
  const csrfToken = await getCsrfToken();

  const accessToken = req?.cookies?.get("accessToken");
  const searchParams = req?.nextUrl?.searchParams;

  const asList = searchParams.get("asList");
  const type = searchParams.get("type");
  const page = searchParams.get("page") ?? 0;
  const size = searchParams.get("size") ?? 5;
  try {
    // fetch pictograms as list
    if (asList) {
      return await handleGetAllAsList(accessToken, csrfToken);
    }
    // fetch pictograms as pages
    if (type && type != "all") {
      return await handleGetAllByType(accessToken, page, size, csrfToken, type);
    }
    return await handleGetAll(accessToken, page, size, csrfToken);
  } catch (error) {
    console.error("Error fetching pictograms:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleGetAll(accessToken, pageNo, listSize, csrfToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/pictograms?page=${pageNo}&size=${listSize}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        "X-XSRF-TOKEN": csrfToken,
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
      { message: "Failed to fetch pictograms" },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}

async function handleGetAllByType(
  accessToken,
  pageNo,
  listSize,
  csrfToken,
  type
) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/pictograms?page=${pageNo}&size=${listSize}&type=${type}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        "X-XSRF-TOKEN": csrfToken,
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
      { message: "Failed to fetch pictograms" },
      { status: response.status }
    );
  }
  const data = await response.json();
  
  return NextResponse.json(data);
}

async function handleGetAllAsList(accessToken, csrfToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/pictograms?asList=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        "X-XSRF-TOKEN": csrfToken,
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
      { message: "Failed to fetch pictograms" },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}
