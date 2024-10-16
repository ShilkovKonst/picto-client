import EntityList from "@/_components/dashboard/EntityList";
import getAccessToken from "@/_utils/cookieUtil";

const page = async ({ searchParams }) => {
  const page = searchParams.page ?? 0;
  const size = searchParams.size ?? 5;
  const data = await getAllUsers(page, size, accessToken);

  return <EntityList data={data ?? []} entityName="users" />;
};

export default page;

async function getAllUsers(page, size, accessToken) {
  const response = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/users?page=${page}&size=${size}`,
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