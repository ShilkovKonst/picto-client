export async function getAllAsPage(entityName, page, size, accessToken) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/${entityName}?page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken?.value}` : "",
      },
      credentials: "include",
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
      }
    );
    const data = await response.json();
    return data;
  }

export async function getAllByTypeAsPage(
  entityName,
  page,
  size,
  type,
  accessToken
) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/${entityName}?page=${page}&size=${size}&type=${type}`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken?.value}` : "",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

export async function getAllByOtherId(entityName, otherName, id, accessToken) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/${entityName}/${otherName}/${id}`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken.value}` : "",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

export async function getAllSubEntitiesBySuperEntityId(entityName, id, accessToken) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/${entityName}/${id}/sub${entityName}`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken.value}` : "",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

export async function getAllAsSimpleList(entityName, accessToken) {
  const response = await fetch(`${process.env.CLIENT_API_BASE_URL}/api/${entityName}?asList=true&simple=true`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken.value}` : "",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

export async function getOneById(entityName, id, accessToken) {
    const responsePicto = await fetch(
      `${process.env.CLIENT_API_BASE_URL}/api/${entityName}/${id}`,
      {
        method: "GET",
        headers: {
          Cookie: accessToken ? `accessToken=${accessToken.value}` : "",
        },
        credentials: "include",
      }
    );
    const dataPicto = await responsePicto.json();
    return dataPicto;
  }
  
