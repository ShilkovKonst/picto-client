import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const id = params.id;
  const accessToken = req?.cookies?.get("accessToken");

  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/tags/${id}`,
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
        { message: "Failed to fetch tag" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching tag:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

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

  // send request to server with body, update new tag
  const id = params.id;
  const accessToken = req?.cookies?.get("accessToken");
  const formData = await req.formData();

  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/tags/${id}`,
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
        { message: "Failed to update tag" },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating tag:", error.message);
    return NextResponse.json(
      { message: "Internal server error while updating tag" },
      { status: 500 }
    );
  }
}

async function handleGetOne(id, accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/tags/${id}`,
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
      { message: "Failed to fetch tag" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}

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
  // send request to server with body, update new category
  const id = params.id;
  const accessToken = req?.cookies?.get("accessToken");
  try {
    const response = await fetch(`${process.env.SERVER_BASE_URL}/tags/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        Cookie: cookies,
        "X-XSRF-TOKEN": csrfToken,
      },
      credentials: "include",
    });
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to delete tag" },
        { status: response.status }
      );
    }
    // const data = await response.json();
    return NextResponse.json(
      { status: response.status },
      { statusText: response.statusText },
    );
  } catch (error) {
    console.error("Error deleting tag:", error.message);
    return NextResponse.json(
      { message: "Internal server error while deleting tag" },
      { status: 500 }
    );
  }
}
