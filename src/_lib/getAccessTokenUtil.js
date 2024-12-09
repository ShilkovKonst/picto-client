import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const getAccessToken = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  return { accessToken: accessToken, session: jwtDecode(accessToken?.value) };
};
export default getAccessToken;
