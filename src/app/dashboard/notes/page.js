import EntityList from "@/_components/dashboard/EntityList";
import { getAllAsPage } from "@/_utils/entityApiUtil";
import getAccessToken from "@/_utils/getAccessTokenUtil";

const page = async ({ searchParams }) => {
  const accessToken = getAccessToken();
  const page = searchParams.page ?? 0;
  const size = searchParams.size ?? 5;
  const data = await getAllAsPage("notes", page, size, accessToken);
  
  return <EntityList data={data ?? []} entityName="notes" />;
};

export default page;
