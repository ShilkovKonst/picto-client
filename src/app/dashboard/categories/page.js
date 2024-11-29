import EntityList from "@/_components/dashboard/EntityList";
import { getAllAsPage, getAllByOtherAsPage } from "@/_utils/entityApiUtil";
import getAccessToken from "@/_utils/getAccessTokenUtil";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const searchParams = await props.searchParams;
  const { page = 0, size = 5, type } = searchParams;
  const data =
    type != "all"
      ? await getAllByOtherAsPage(
          "categories",
          "type",
          type,
          page,
          size,
          accessToken
        )
      : await getAllAsPage("categories", page, size, accessToken);

  return (
    <EntityList session={session} data={data ?? []} entityName="categories" />
  );
};

export default page;
