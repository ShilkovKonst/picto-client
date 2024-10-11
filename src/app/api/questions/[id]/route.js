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

export async function GET(req, { params }) {
  const csrfToken = await getCsrfToken();
  const id = params.id;
  const accessToken = req?.cookies?.get("accessToken");

  try {
    return await handleGetOne(id, accessToken, csrfToken);
  } catch (error) {
    console.error("Error fetching pictograms:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleGetOne(id, accessToken, csrfToken) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/questions/${id}`,
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
