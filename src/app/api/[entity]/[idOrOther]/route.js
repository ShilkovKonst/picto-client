import { NextResponse } from "next/server";

// ---------------------GET---------------------------
export async function GET(req, { params }) {
  const entityName = params.entity;
  const id = params.idOrOther;
  const accessToken = req?.cookies?.get("accessToken");
  try {
    return await getOne(entityName, id, accessToken);
  } catch (error) {
    console.error("Error fetching entity:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ---------------------UPDATE---------------------------
export async function PUT(req, { params }) {
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

  // send request to server with body, update entity
  const entityName = params.entity;
  const id = params.idOrOther;
  const accessToken = req?.cookies?.get("accessToken");
  const formData = await req.formData();

  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/${entityName}/${id}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          Cookie: cookies,
          "X-XSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to update entity" },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating entity:", error.message);
    return NextResponse.json(
      { message: "Internal server error while updating entity" },
      { status: 500 }
    );
  }
}

// ---------------------DELETE---------------------------
export async function DELETE(req, { params }) {
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

  // send request to server, delete entity
  const entityName = params.entity;
  const id = params.idOrOther;
  const accessToken = req?.cookies?.get("accessToken");
  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/${entityName}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          Cookie: cookies,
          "X-XSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to delete entity" },
        { status: response.status }
      );
    }
    // const data = await response.json();
    return NextResponse.json(
      { status: response.status },
      { statusText: response.statusText }
    );
  } catch (error) {
    console.error("Error deleting entity:", error.message);
    return NextResponse.json(
      { message: "Internal server error while deleting entity" },
      { status: 500 }
    );
  }
}

// ---------------------methods---------------------------
async function getOne(entityName, id, accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/${entityName}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    console.log("entity API !response.ok: ", response.statusText);
    if (response.status == 401) {
      // TODO: create logic
    }
    return NextResponse.json(
      { message: "Failed to fetch entity" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}