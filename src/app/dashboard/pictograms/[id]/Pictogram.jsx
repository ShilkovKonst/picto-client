"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EntityHead from "@/_components/dashboard/_entityHead";
import { getOneMediaFile } from "@/_helpers/pictoApiHelper";


const Pictogram = ({ pictogram, category }) => {
  return (
    <>
      <table className="table w-full">
        {pictogram && (
          <EntityHead entity={pictogram} entityName={"pictograms"} />
        )}
        <tbody className="flex flex-col gap-2">
          {pictogram?.media?.imageFileRes && (
            <>
              <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
                <th className="text-start w-[40%] lg:w-[20%]">Image</th>
                <td className="text-start w-[45%] lg:w-[30%]">
                  {pictogram?.media?.imageFileRes && (
                    <Image
                      className="h-14 w-14 md:h-16 md:w-16"
                      src={`data:${pictogram?.media?.imageFileRes.type};base64,${pictogram?.media?.imageFileRes.imageBase64}`}
                      alt={pictogram?.media?.imageName}
                      width={60}
                      height={60}
                    />
                  )}
                </td>
                {category ? (
                  <>
                    <th className="text-start w-[40%] lg:w-[20%]">
                      Category:{" "}
                    </th>
                    <td className="text-start w-[45%] lg:w-[30%] ">
                      <Link href={`/dashboard/categories/${category.id}`} className="p-2 rounded-full text-white hover:text-black bg-pbg hover:bg-pred transition ease-in-out duration-300">
                        {category.title}
                      </Link>
                    </td>
                  </>
                ) : (
                  <th>Il faut ajouter une categorie !</th>
                )}
              </tr>
              <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
                <th className="text-start w-[40%] lg:w-[20%]">Type</th>
                <td className="text-start w-[45%] lg:w-[30%]">
                  {pictogram.type}
                </td>
              </tr>
              <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
                <th className="text-start w-[40%] lg:w-[20%]">Tags</th>
                <td className="flex flex-row flex-wrap gap-3 text-start w-[45%] lg:w-[30%]">
                  {pictogram.tags.map((tag, i) => (
                      <Link
                        key={i}
                        href={`/dashboard/tags/${tag.id}`}
                        className="bg-pbg hover:bg-pred transition ease-in-out duration-300 text-white w-auto py-1 px-3 rounded-full"
                      >
                        {tag.title}
                      </Link>
                  ))}
                </td>
              </tr>
              {pictogram.tags.some((el) => el.id == 3) && (
                <>
                  <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
                    {pictogram.type == "verbe" && (
                      <>
                        <th className="text-start w-[40%] lg:w-[20%]">
                          Participe passé
                        </th>
                        <td className="text-start w-[45%] lg:w-[30%]">
                          {pictogram.irregular.pastParticiple}
                        </td>
                      </>
                    )}
                    {pictogram.type == "nom" && (
                      <>
                        <th className="text-start w-[40%] lg:w-[20%]">
                          Pluriel
                        </th>
                        <td className="text-start w-[45%] lg:w-[30%]">
                          {pictogram.irregular.plurial}
                        </td>
                      </>
                    )}
                    {pictogram.type == "adjectif" && (
                      <>
                        <th className="text-start w-[40%] lg:w-[20%]">
                          Féminin
                        </th>
                        <td className="text-start w-[45%] lg:w-[30%]">
                          {pictogram.irregular.feminin}
                        </td>
                        <th className="text-start w-[40%] lg:w-[20%]">
                          Féminin pluriel
                        </th>
                        <td className="text-start w-[45%] lg:w-[30%]">
                          {pictogram.irregular.plurial}
                        </td>
                      </>
                    )}
                  </tr>
                </>
              )}
            </>
          )}
        </tbody>
      </table>
      {pictogram.tags.some((el) => el.id == 3) && pictogram.type == "verbe" && (
        <table className="table w-full">
          <thead className="flex flex-col gap-2">
            <tr className="border-b">
              <th className="text-lg md:text-xl flex justify-center items-center">
                Conjugaisons
              </th>
            </tr>
          </thead>
          <tbody className="flex flex-col lg:flex-row">
            {pictogram.irregular.conjugations.map((c, i) => (
              <tr
                key={i}
                className="flex flex-row lg:flex-col gap-1 lg:gap-0 justify-start items-start md:items-start text-sm sm:text-base p-2 border-b w-full"
              >
                <th className="text-start capitalize w-[40%] lg:w-[50%]">
                  {c.tense}
                </th>
                <td className="text-start w-[45%] lg:w-[50%]">
                  <div>{c.firstSingular}</div>
                  <div>{c.secondSingular}</div>
                  <div>{c.thirdSingular}</div>
                  <div>{c.firstPlurial}</div>
                  <div>{c.secondPlurial}</div>
                  <div>{c.thirdPlurial}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Pictogram;
