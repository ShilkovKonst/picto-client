import { NextResponse } from "next/server";

export async function GET(req) {
  const accessToken = req.cookies?.get("accessToken");  
  const searchParams = req.nextUrl?.searchParams;
  const { asList, simple, type, page = 0, size = 5 } = Object.fromEntries(searchParams.entries());
  try {
    // fetch categories as list
    if (asList) {
      if (type === "supercategories") {
        return await getAllByTypeAsList(
          accessToken,
          "supercategories"
        );
      }
      if (type === "subcategories") {
        return await getAllByTypeAsList(
          accessToken,
          "subcategories"
        );
      }
      if (simple) {
        return await getAllAsSimpleList(accessToken);
      }
      return await getAllAsList(accessToken);
    }
    // fetch categories as pages
    else {
      if (type === "supercategories") {
        return await getAllByType(
          accessToken,
          page,
          size,
          "supercategories"
        );
      }
      if (type === "subcategories") {
        return await getAllByType(
          accessToken,
          page,
          size,
          "subcategories"
        );
      }
      return await getAll(accessToken, page, size);
    }
  } catch (error) {
    console.error("Error fetching pictograms:", error.message);
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
  
  // send request to server with body, create new category
  const accessToken = req?.cookies?.get("accessToken");
  const formData = await req.formData();
  try {
    const response = await fetch(`${process.env.SERVER_BASE_URL}/categories`, {
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
        { message: "Failed to create category" },
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

async function getAll(accessToken, pageNo, listSize) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/categories?page=${pageNo}&size=${listSize}`,
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

async function getAllByType(
  accessToken,
  pageNo,
  listSize,
  type
) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/categories?page=${pageNo}&size=${listSize}&type=${type}`,
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

async function getAllAsList(accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/categories?asList=true`,
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

async function getAllAsSimpleList(accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/categories?simple=true`,
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

async function getAllByTypeAsList(accessToken, type) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/categories/${type}`,
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
