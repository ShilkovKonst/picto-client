import EntityList from "@/_components/dashboard/EntityList";
import getAccessToken from "@/_utils/cookieUtil";
import { getAllAsPage, getAllByTypeAsPage } from "@/_utils/entityApiUtil";

const page = async ({ searchParams }) => {
  const accessToken = getAccessToken();
  const page = searchParams.page ?? 0;
  const size = searchParams.size ?? 5;
  const data =
    searchParams.type != "all"
      ? await getAllByTypeAsPage(
          "categories",
          page,
          size,
          searchParams.type,
          accessToken
        )
      : await getAllAsPage("categories", page, size, accessToken);

  return <EntityList data={data ?? []} entityName="categories" />;
};

export default page;
