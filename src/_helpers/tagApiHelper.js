import { getCsrfToken } from "./authApiHelpers";

const REVALIDATE = parseInt(process.env.REVALIDATE);

// find all pictograms as pages for dashboard
export const getAll = async () => {
  const csrfToken = await getCsrfToken();

  try {
    const res = await fetch(  
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tags`,
      {
        next: { revalidate: REVALIDATE },
        headers: {
          "X-XSRF-TOKEN": csrfToken, // add CSRF token to headers
        },
        credentials: "include",
      }
    );
    if (res.ok) {
      const body = await res.json();
      console.log(body);
      return body;
    }
  } catch (error) {
    console.error("Error fetching tags:", error.message);
  }
};

export async function getOneById(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tags/${id}`,
    {
      next: { revalidate: REVALIDATE },
    }
  ).catch((e) => {
    throw new Error("Failed to fetch data: " + e.message);
  });
  return res.json();
}

export async function createOne(body) {
  const csrfToken = await getCsrfToken();

  console.log(body);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tags`,
    {
      method: "POST",
      body: body,
      headers: {
        "X-XSRF-TOKEN": csrfToken, // add CSRF token to headers
      },
      credentials: "include",
    }
  ).catch((e) => {
    throw new Error("Failed to create data: " + e.message);
  });
  if (!res.ok) {
    const errorDetails = await res.json();
    throw new Error(`${errorDetails.message}`);
  }
  return res.json();
}

export async function updateOneById(id, body) {
  const csrfToken = await getCsrfToken();

  console.log(body.get("imageFile"));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tags/${id}`,
    {
      method: "PUT",
      body: body,
      headers: {
        "X-XSRF-TOKEN": csrfToken, // add CSRF token to headers
      },
      credentials: "include",
    }
  ).catch((e) => {
    throw new Error("Failed to update data: " + e.message);
  });
  if (!res.ok) {
    const errorDetails = await res.json();
    throw new Error(`${errorDetails.message}`);
  }
  return res.json();
}

export async function deleteOneById(id) {
  const csrfToken = await getCsrfToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tags/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken, // add CSRF token to headers
      },
      credentials: "include",
    }
  ).catch((e) => {
    throw new Error("Failed to delete data: " + e.message);
  });
  return res.status;
}