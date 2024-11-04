import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getOneById } from "@/_utils/entityApiUtil";
import Note from "./Note";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const note = await getOneById("notes", params.id, accessToken);
  
  return <Note note={note} />;
};

export default page;
