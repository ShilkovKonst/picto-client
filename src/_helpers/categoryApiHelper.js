import { getCsrfToken } from "./authApiHelpers";

const REVALIDATE = parseInt(process.env.REVALIDATE);

// find all categories as pages for dashboard
export const getAll = async (pageNo, listSize) => {
  const csrfToken = await getCsrfToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories?page=${pageNo}&size=${listSize}`,
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
      return body;
    }
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};

// find all supercategories as pages for dashboard
export const getAllSuper = async (pageNo, listSize) => {
  const csrfToken = await getCsrfToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories?page=${pageNo}&size=${listSize}&type=supercategories`,
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
      return body;
    }
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};

// find all supercategories as pages for dashboard
export const getAllSub = async (pageNo, listSize) => {
  const csrfToken = await getCsrfToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories?page=${pageNo}&size=${listSize}&type=subcategories`,
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
      return body;
    }
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};

// find all categories as one list
export async function getAllAsList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories?asList=true`,
    {
      next: { revalidate: REVALIDATE },
    }
  ).catch((e) => {
    throw new Error("Failed to fetch data: " + e.message);
  });
  return res.json();
}

// find all categories as one list
export async function getAllAsSimpleList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories?simple=true`,
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}`,
    {
      next: { revalidate: REVALIDATE },
    }
  ).catch((e) => {
    throw new Error("Failed to fetch data: " + e.message);
  });
  return res.json();
}

// find all subcategories
export async function getAllBySupercategory(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}/subcategories`,
    {
      next: { revalidate: REVALIDATE },
    }
  ).catch((e) => {
    throw new Error("Failed to fetch data: " + e.message);
  });
  return res.json();
}

// find all by question ID
export async function getAllByQuestionId(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/question/${id}`,
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}`,
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}`,
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

// category media management
export async function createOneMedia(data) {
  const csrfToken = await getCsrfToken();

  console.log(data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/media`,
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/media/${id}`,
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

export const getOneMediaFile = async (id, setImageSrc) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}/image`
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
