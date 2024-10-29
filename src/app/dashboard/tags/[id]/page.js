import Tag from "./Tag";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { getAllByOtherAsList, getOneById } from "@/_utils/entityApiUtil";

const page = async ({ params }) => {
  const accessToken = getAccessToken();
  const tag = await getOneById("tags", params.id, accessToken);
  const pictograms = await getAllByOtherAsList("pictograms", "tag", params.id, accessToken);

  return <Tag tag={tag} pictograms={pictograms} />;
};

export default page;

// async function getOneById(id) {
//   const response = await fetch(
//     `${process.env.CLIENT_API_BASE_URL}/api/tags/${id}`,
//     {
//       method: "GET",
//       headers: {
//         Cookie: getAccessToken()
//           ? `accessToken=${getAccessToken()?.value}`
//           : "",
//       },
//       credentials: "include",
//     }
//   );
//   const data = await response.json();
//   return data;
// }

// async function getAllPictosByTagId(id) {
//   const response = await fetch(
//     `${process.env.CLIENT_API_BASE_URL}/api/pictograms/tag/${id}`,
//     {
//       method: "GET",
//       headers: {
//         Cookie: getAccessToken()
//           ? `accessToken=${getAccessToken()?.value}`
//           : "",
//       },
//       credentials: "include",
//     }
//   );
//   const data = await response.json();
//   return data;
// }
