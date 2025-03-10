import { getCsrfToken } from "@/_lib/getCsrfToken";
import { NextResponse } from "next/server";

export async function GET(req, props) {
  const params = await props.params;
  const accessToken = req?.cookies?.get("accessToken");
  const entityName = params.entity;
  const searchParams = req?.nextUrl?.searchParams;
  const {
    asList,
    simple,
    signup,
    page = 0,
    size = 5,
  } = Object.fromEntries(searchParams.entries());
  try {
    // fetch entities as list
    if (asList) {
      return await getAllAsList(entityName, accessToken);
    }
    if (simple) {
      return await getAllAsSimpleList(entityName, accessToken);
    }
    if (signup) {
      return await getAllAsSimpleListForSignUp(entityName);
    }
    return await getAllAsPage(entityName, page, size, accessToken);
  } catch (error) {
    console.error("Error fetching entities:", error.message);
    return NextResponse.json(
      { message: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(req, props) {
  const params = await props.params;
  const cookies = req.headers.get("cookie");
  const entityName = params.entity;
  // retrieve CSRF token from server
  const csrfData = await getCsrfToken(cookies);
  const csrfToken = csrfData.token;

  // send request to server with body, create new entity
  const accessToken = req?.cookies?.get("accessToken");
  const formData = await req.formData();
  console.log(formData);
  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/${entityName}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          Cookie: cookies,
          "X-XSRF-TOKEN": csrfToken,
        },
      }
    );
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to create entity" },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json({
      ...data,
      status: data.status ?? response.status,
    });
  } catch (error) {
    console.error("Error creating entity:", error.message);
    return NextResponse.json(
      { message: "Internal server error while creating entity" },
      { status: 500 }
    );
  }
}

async function getAllAsPage(entityName, page, size, accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/${entityName}?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken.value}` : "",
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
      { message: "Failed to fetch entities" },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}

async function getAllAsList(entityName, accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/${entityName}?asList=true`,
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken.value}` : "",
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
      { message: "Failed to fetch entities" },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}

async function getAllAsSimpleList(entityName, accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/${entityName}?asList=true&simple=true`,
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken.value}` : "",
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
      { message: "Failed to fetch entities" },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}

async function getAllAsSimpleListForSignUp(entityName) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/${entityName}/simple`
  );
  if (!response.ok) {
    console.log("entity API !response.ok: ", response.statusText);
    if (response.status == 401) {
      // TODO: create logic
    }
    return NextResponse.json(
      { message: "Failed to fetch entities" },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}
