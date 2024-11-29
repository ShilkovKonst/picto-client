import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getOneById } from "@/_utils/entityApiUtil";
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
