import UserProfile from "@/_components/dashboard/profile/userProfile";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { jwtDecode } from "jwt-decode";

const page = () => {
  const accessToken = getAccessToken();
  const user = accessToken ? jwtDecode(accessToken?.value) : null;
  
  return <UserProfile user={user} />;
};

export default page;
