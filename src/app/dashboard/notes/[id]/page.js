import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getOneById } from "@/_utils/entityApiUtil";
import Note from "./Note";
import { jwtDecode } from "jwt-decode";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const session = jwtDecode(accessToken?.value);
  const note = await getOneById("notes", params.id, accessToken);
  
  return <Note session={session} note={note} />;
};

export default page;
