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
          "pictograms",
          page,
          size,
          searchParams.type,
          accessToken
        )
      : await getAllAsPage("pictograms", page, size, accessToken);

  return (
    <EntityList
      data={data && data?.content?.length > 0 ? data : []}
      entityName="pictograms"
    />
  );
};

export default page;
