import PasswordReset from "./PasswordReset";
import { jwtDecode } from "jwt-decode";

const page = async (props) => {
  const searchParams = await props.searchParams;
  const { token } = searchParams;
  
  return <PasswordReset token={token ? jwtDecode(token) : null} />;
};

export default page;
