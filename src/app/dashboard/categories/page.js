import EntityList from "@/_components/dashboard/EntityList";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllAsPage, getAllByOtherAsPage } from "@/_utils/entityApiUtil";

const page = async ({ searchParams }) => {
  const accessToken = getAccessToken();
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

  return <EntityList data={data ?? []} entityName="categories" />;
};

export default page;
