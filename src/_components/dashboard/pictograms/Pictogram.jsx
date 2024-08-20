"use client";
import { getOneMediaFile } from "@/_helpers/pictoApiHelper";
import { Accordion } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EntityHead from "../_entityHead";

const Pictogram = ({ pictogram, category }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    getOneMediaFile(pictogram?.media?.id, setImageSrc);
  }, [pictogram?.media?.id]);

  return (
    <>
      <table className="table w-full">
        {pictogram && <EntityHead entity={pictogram} entityName={"pictograms"} />}
        <tbody className="flex flex-col gap-2">
          {pictogram && (
            <>
              <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
                <th className="text-start w-[40%] lg:w-[20%]">Image</th>
                <td className="text-start w-[45%] lg:w-[30%]">
                  {imageSrc.length > 0 && (
                    <Image
                      className="h-14 w-14 md:h-16 md:w-16"
                      src={imageSrc}
                      alt={pictogram?.media?.imageName}
                      width={60}
                      height={60}
                    />
                  )}
                </td>
                {category && (
                  <>
                    <th className="text-start w-[40%] lg:w-[20%]">
                      Category:{" "}
                    </th>
                    <td className="text-start w-[45%] lg:w-[30%]">
                      <Link href={`/dashboard/categories/${category.id}`}>
                        {category.title}
                      </Link>
                    </td>
                  </>
                )}
              </tr>
              <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
                <th className="text-start w-[40%] lg:w-[20%]">Type</th>
                <td className="text-start w-[45%] lg:w-[30%]">
                    {pictogram.type}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Pictogram;
