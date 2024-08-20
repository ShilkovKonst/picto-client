import { getCsrfToken } from "./authApiHelpers";

const REVALIDATE = parseInt(process.env.REVALIDATE);

// find all pictograms as pages for dashboard
export const getAll = async (pageNo, listSize, isSeance) => {
  const csrfToken = await getCsrfToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/pictograms?page=${pageNo}&size=${listSize}&isSeance=${isSeance}`,
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
    console.error("Error fetching pictograms:", error.message);
  }
};

// find all pictograms as one list
export async function getAllAsList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/pictograms?isSeance=true`,
    {
      next: { revalidate: REVALIDATE },
    }
  ).catch((e) => {
    throw new Error("Failed to fetch data: " + e.message);
  });
  return res.json();
}

// find all by category
export async function getAllByCategory(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/pictograms/category/${id}`,
    {
      next: { revalidate: REVALIDATE },
    }
  ).catch((e) => {
    throw new Error("Failed to fetch data: " + e.message);
  });
  return res.json();
}

// find all by type
export async function getAllByType(type) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/pictograms/type/${type}`,
    {
      next: { revalidate: REVALIDATE },
    }
  ).catch((e) => {
    throw new Error("Failed to fetch data: " + e.message);
  });
  return res.json();
}

export async function getOneById(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/pictograms/${id}`,
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/pictograms`,
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/pictograms/${id}`,
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/pictograms/${id}`,
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

// pictogram media management
export async function createOneMedia(data) {
  const csrfToken = await getCsrfToken();

  console.log(data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/pictograms/media`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken, // add CSRF token to headers
      },
      credentials: "include",
    }
  ).catch((e) => {
    throw new Error("Failed to create data: " + e.message);
  });
  return res.json();
}

export async function deleteOneMediaById(id) {
  const csrfToken = await getCsrfToken();

  console.log(data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/pictograms/media/${id}`,
    {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken, // add CSRF token to headers
      },
      credentials: "include",
    }
  ).catch((e) => {
    throw new Error("Failed to create data: " + e.message);
  });
  return res.json();
}

export const getOneMediaFile = async (mediaId, setImageSrc) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/pictograms/${mediaId}/image`
    );
    if (response.ok) {
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      setImageSrc && setImageSrc(objectURL);
    } else {
      console.error("Failed to fetch image");
    }
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};
