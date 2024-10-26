import EntityList from "@/_components/dashboard/EntityList";
import getAccessToken from "@/_utils/getAccessTokenUtil";

const page = async ({ searchParams }) => {
  const page = searchParams.page ?? 0;
  const size = searchParams.size ?? 5;
  const data = await getAllTags(page, size);

  return <EntityList data={data ?? []} entityName="tags" />;
};

export default page;

async function getAllTags(page, size) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/tags?page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        Cookie: getAccessToken() ? `accessToken=${getAccessToken()?.value}` : "",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}