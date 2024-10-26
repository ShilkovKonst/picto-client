import EntityList from "@/_components/dashboard/EntityList";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllAsPage } from "@/_utils/entityApiUtil";

const page = async ({ searchParams }) => {
  const accessToken = getAccessToken();
  const page = searchParams.page ?? 0;
  const size = searchParams.size ?? 5;
  const data = await getAllAsPage("patients", page, size, accessToken);

  return <EntityList data={data ?? []} entityName="patients" />;
};

export default page;
