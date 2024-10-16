import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const id = params.id;
  const accessToken = req?.cookies?.get("accessToken");

  try {
    return await handleGetOne(id, accessToken);
  } catch (error) {
    console.error("Error fetching pictograms:", error.message);
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

  // send request to server with body, update new category
  const id = params.id;
  const accessToken = req?.cookies?.get("accessToken");
  const formData = await req.formData();

  try {
    const response = await fetch(`${process.env.SERVER_BASE_URL}/categories/${id}`, {
      method: "PUT",
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
        { message: "Failed to update category" },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating category:", error.message);
    return NextResponse.json(
      { message: "Internal server error while updating category" },
      { status: 500 }
    );
  }
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
    const response = await fetch(`${process.env.SERVER_BASE_URL}/categories/${id}`, {
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
        { message: "Failed to delete category" },
        { status: response.status }
      );
    }
    // const data = await response.json();
    return NextResponse.json(
      { status: response.status },
      { statusText: response.statusText },
    );
  } catch (error) {
    console.error("Error deleting category:", error.message);
    return NextResponse.json(
      { message: "Internal server error while deleting category" },
      { status: 500 }
    );
  }
}

async function handleGetOne(id, accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/categories/${id}`,
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
      { message: "Failed to fetch pictograms" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
