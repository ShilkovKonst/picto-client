import EntityList from "@/_components/dashboard/EntityList";
import { getAllAsPage } from "@/_lib/entityApiUtil";
import getAccessToken from "@/_lib/getAccessTokenUtil";

const page = async props => {
  const { accessToken, session } = getAccessToken();
  const searchParams = await props.searchParams;
  const page = searchParams.page ?? 0;
  const size = searchParams.size ?? 5;
  const data = await getAllAsPage("notes", page, size, accessToken);

  return <EntityList session={session} data={data ?? []} entityName="notes" />;
};

export default page;
