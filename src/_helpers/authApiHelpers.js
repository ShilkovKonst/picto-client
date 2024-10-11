export const signup = async (body) => {
  const csrfToken = await getCsrfToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/signUp`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken, // add CSRF token to headers
      },
      credentials: "include",
    }
  ).catch((e) => {
    throw new Error("Failed to create user: " + e.message);
  });
  return res.json();
};

export const signin = async (body) => {
  const csrfToken = await getCsrfToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/signIn`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken, // добавляем CSRF токен в заголовки
      },
      credentials: "include", // важно для отправки кук
    }
  ).catch((e) => {
    throw new Error("Failed to login user: " + e.message);
  });
  if (res.ok) {
    console.log("user login success");
  }
  return res.json();
};

export const refresh = async () => {
  const csrfToken = await getCsrfToken();
  console.log("csrfToken from helper", csrfToken);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": csrfToken, // добавляем CSRF токен в заголовки
      },
      credentials: "include", // важно для отправки кук
    }
  ).catch((e) => {
    throw new Error("Failed to refresh token: " + e.message);
  });
  
  if (res.ok) {
    console.log("access token refreshed successefully");
  }
  console.log("res.url from helper", res.url)
  return res.json();
};

export const getCsrfToken = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/csrf/token`,
    {
      method: "GET",
      // important to sending and receiving cookies
      credentials: "include",
    }
  );
  if (res.ok) {
    const data = await res.json();
    // assuming the token is in the 'token' field
    return data.token;
  } else {
    throw new Error("Failed to fetch CSRF token");
  }
};
