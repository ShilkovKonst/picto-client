import EntityList from "@/_components/dashboard/EntityList";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllAsPage } from "@/_utils/entityApiUtil";
import { jwtDecode } from "jwt-decode";

const page = async ({ searchParams }) => {
  const accessToken = getAccessToken();
  const session = jwtDecode(accessToken?.value);
  const page = searchParams.page ?? 0;
  const size = searchParams.size ?? 5;
  const data = await getAllAsPage("users", page, size, accessToken);
  return (
    <EntityList
      data={data ?? []}
      session={session}
      entityName="users"
    />
  );
};

export default page;
