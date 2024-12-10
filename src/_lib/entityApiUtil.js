// ---------------------GET ALL---------------------------
export async function getAllAsPage(entityName, page, size, accessToken) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/${entityName}?page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken?.value}` : "",
      },
      credentials: "include",
      next: { revalidate: parseInt(process.env.REVALIDATE) }
    }
  );
  const data = await response.json();
  return data;
}
export async function getAllAsList(entityName, accessToken) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/${entityName}?asList=true`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken.value}` : "",
      },
      credentials: "include",
      next: { revalidate: parseInt(process.env.REVALIDATE) }
    }
  );
  const data = await response.json();
  return data;
}

export async function getAllAsSimpleList(entityName, accessToken) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/${entityName}?asList=true&simple=true`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken.value}` : "",
      },
      credentials: "include",
      next: { revalidate: parseInt(process.env.REVALIDATE) }
    }
  );
  const data = await response.json();
  return data;
}

export async function getAllAsSimpleListForSignUp(entityName) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/${entityName}?signup=true`,
    {
      method: "GET",
      next: { revalidate: parseInt(process.env.REVALIDATE) }
    }
  );
  const data = await response.json();
  return data;
}

// ---------------------GET ALL BY OTHER---------------------------
export async function getAllByOtherAsPage(
  entityName,
  otherName,
  otherId,
  page,
  size,
  accessToken
) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/${entityName}/${otherName}/${otherId}?page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken?.value}` : "",
      },
      credentials: "include",
      next: { revalidate: parseInt(process.env.REVALIDATE) }
    }
  );
  const data = await response.json();
  return data;
}

export async function getAllByOtherAsList(
  entityName,
  otherName,
  otherId,
  accessToken
) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/${entityName}/${otherName}/${otherId}?asList=true`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken.value}` : "",
      },
      credentials: "include",
      next: { revalidate: parseInt(process.env.REVALIDATE) }
    }
  );
  const data = await response.json();
  return data;
}

// ---------------------GET ONE---------------------------
export async function getOneById(entityName, id, accessToken) {
  const responsePicto = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/${entityName}/${id}`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken.value}` : "",
      },
      credentials: "include",
      next: { revalidate: parseInt(process.env.REVALIDATE) }
    }
  );
  const dataPicto = await responsePicto.json();
  return dataPicto;
}