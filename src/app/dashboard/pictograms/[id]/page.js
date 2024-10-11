import React from "react";
import Pictogram from "./Pictogram";
import { cookies } from "next/headers";

const page = async ({ params }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const dataPicto = await apiResponse(params.id, "pictograms", accessToken)
  const dataCat = await apiResponse(dataPicto.category, "categories", accessToken)
  
  return <Pictogram pictogram={dataPicto ?? null} category={dataCat ?? null} />;
};

export default page;

async function apiResponse(id, entity, accessToken) {
  const responsePicto = await fetch(
    `${process.env.CLIENT_API_BASE_URL}/api/${entity}/${id}`,
    {
      method: "GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken.value}` : "",
      },
      credentials: "include",
    }
  );
  const dataPicto = await responsePicto.json();
  return dataPicto;
}
