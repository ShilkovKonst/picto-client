import getAccessToken from "@/_lib/getAccessTokenUtil";
import { getOneById } from "@/_lib/entityApiUtil";
import Note from "./Note";
import { notFound } from "next/navigation";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const params = await props.params;
  const note = await getOneById("notes", params.id, accessToken);
  note?.status == 404 && notFound();
  
  return <Note session={session} note={note} />;
};

export default page;
