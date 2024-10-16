import { cookies } from "next/headers";

const getAccessToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("accessToken");
};

export default getAccessToken;
