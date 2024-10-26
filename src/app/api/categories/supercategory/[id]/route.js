import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const id = params.id;
  const accessToken = req?.cookies?.get("accessToken");
  try {
    return await getAllBySupercategoryId(id, accessToken);
  } catch (error) {
    console.error("Error fetching pictograms:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function getAllBySupercategoryId(id, accessToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/categories/supercategory/${id}`,
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
