import EntityList from "@/_components/dashboard/EntityList";
import getAccessToken from "@/_lib/getAccessTokenUtil";
import { getAllAsPage, getAllByOtherAsPage } from "@/_lib/entityApiUtil";

const page = async (props) => {
  const { accessToken, session } = getAccessToken();
  const searchParams = await props.searchParams;
  const { page = 0, size = 5, type } = searchParams;
  const data =
    type == "all"
      ? await getAllAsPage("pictograms", page, size, accessToken)
      : type == "orphan"
      ? await getAllByOtherAsPage(
          "pictograms",
          "category",
          type,
          page,
          size,
          accessToken
        )
      : await getAllByOtherAsPage(
          "pictograms",
          "type",
          type,
          page,
          size,
          accessToken
        );

  return (
    <EntityList
      session={session}
      data={data && data?.content?.length > 0 ? data : []}
      entityName="pictograms"
    />
  );
};

export default page;
