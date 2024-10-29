import EntityList from "@/_components/dashboard/EntityList";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllAsPage, getAllByOtherAsPage } from "@/_utils/entityApiUtil";

const page = async ({ searchParams }) => {
  const accessToken = getAccessToken();
  const { page = 0, size = 5, type } = searchParams;
  const data =
    type != "all"
      ? await getAllByOtherAsPage(
          "pictograms",
          "type",
          type,
          page,
          size,
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
