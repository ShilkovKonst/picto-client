import EntityList from "@/_components/dashboard/EntityList";
import { getAllAsPage } from "@/_utils/entityApiUtil";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { jwtDecode } from "jwt-decode";

const page = async ({ searchParams }) => {
  const accessToken = getAccessToken();
  const session = jwtDecode(accessToken?.value);
  const page = searchParams.page ?? 0;
  const size = searchParams.size ?? 5;
  const data = await getAllAsPage("notes", page, size, accessToken);
  
  return <EntityList session={session} data={data ?? []} entityName="notes" />;
};

export default page;
