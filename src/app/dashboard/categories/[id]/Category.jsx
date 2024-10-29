"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import EntityHead from "@/_components/dashboard/_entityHead";
import Accordion from "@/_components/dashboard/_accordion";

const Category = ({
  category,
  pictograms,
  questions,
  subcategories,
  supercategory,
}) => {
  return (
    <>
      <table className="table w-full">
        {category && <EntityHead entity={category} entityName="categories" />}
        <tbody className="flex flex-col gap-2">
          {category && (
            <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-center text-sm sm:text-base p-2 border-b">
              <th className="text-start w-[40%] lg:w-[20%]">Image</th>
              <td className="text-start w-[45%] lg:w-[30%]">
                {category?.media?.imageFileRes && (
                  <Image
                    className="h-14 w-14 md:h-16 md:w-16"
                    src={`data:${category?.media?.imageFileRes.type};base64,${category?.media?.imageFileRes.imageBase64}`}
                    alt={category?.media?.imageName}
                    width={60}
                    height={60}
                  />
                )}
              </td>
              {supercategory && (
                <>
                  <th className="text-start w-[40%] lg:w-[20%]">
                    Super category:{" "}
                  </th>
                  <td className="text-start w-[45%] lg:w-[30%]">
                    <Link
                      href={`/dashboard/categories/${supercategory?.id}`}
                      className="p-2 rounded-full text-white hover:text-black bg-pbg hover:bg-pred transition ease-in-out duration-300"
                    >
                      {supercategory.title}
                    </Link>
                  </td>
                </>
              )}
            </tr>
          )}
        </tbody>
      </table>
      <Accordion
        initial="pictograms"
        entities={[
          { name: "pictograms", entity: pictograms },
          { name: "questions", entity: questions },
          { name: "categories", entity: subcategories },
        ]}
      />
    </>
  );
};

export default Category;
