import { NextResponse } from "next/server";

export async function GET(req, props) {
  const params = await props.params;
  const entityName = params.entity;
  const otherName = params.idOrOther;
  const id = params.otherId;
  console.log(id)
  const accessToken = req?.cookies?.get("accessToken");
  const searchParams = req?.nextUrl?.searchParams;
  const {
    asList,
    page = 0,
    size = 5,
  } = Object.fromEntries(searchParams.entries());
  try {
    if (asList) {
      return await getAllByOtherAsList(entityName, otherName, id, accessToken);
    }
    return await getAllByOtherAsPage(entityName, otherName, id, page, size, accessToken);
  } catch (error) {
    console.error("Error fetching entity:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function getAllByOtherAsPage(entityName, otherName, otherId, page, size, accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/${entityName}/${otherName}/${otherId}?page=${page}&size=${size}`,
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
      { message: "Failed to fetch entity: " + entityName },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}

async function getAllByOtherAsList(entityName, otherName, otherId, accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/${entityName}/${otherName}/${otherId}`,
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
      { message: "Failed to fetch entity: " + entityName },
      { status: response.status }
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}
