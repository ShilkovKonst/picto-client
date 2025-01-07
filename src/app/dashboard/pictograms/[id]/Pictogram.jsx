"use client";
import Image from "next/image";
import Link from "next/link";
import EntityHeader from "@/_components/_shared/molecules/EntityHeader";
import Separator from "@/_components/_shared/atoms/Separator";

const Pictogram = ({ session, pictogram }) => {
  return (
    <>
      <table className="table w-full">
        {pictogram && (
          <EntityHeader
            session={session}
            entity={pictogram}
            entityName={"pictograms"}
          />
        )}
        <tbody className="*:grid *:grid-cols-3">
          <tr className="text-sm sm:text-base p-2">
            {pictogram?.media?.imageFileRes && (
              <>
                <Separator n={3} />
                <th className="text-start col-span-1 flex items-center">
                  Image:
                </th>
                <td className="text-start col-span-2">
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
                <Separator n={3} />
                {pictogram.category ? (
                  <>
                    <th className="text-start col-span-1 flex items-center">
                      Category:{" "}
                    </th>
                    <td className="text-start col-span-2 flex items-center">
                      <Link
                        href={`/dashboard/categories/${pictogram.category.id}`}
                        className="py-1 px-3 rounded-full text-white text-center hover:text-black bg-primary hover:bg-secondary transition ease-in-out duration-300"
                      >
                        {pictogram.category.title}
                      </Link>
                    </td>
                    <Separator n={3} />
                  </>
                ) : (
                  <th>Il faut ajouter une categorie !</th>
                )}
                <th className="text-start col-span-1 flex items-center">
                  Type:
                </th>
                <td className="text-start col-span-2 flex items-center">
                  {pictogram.type}
                </td>
                <Separator n={3} />
                <th className="text-start col-span-1 flex items-center">
                  Tags:
                </th>
                <td className="text-start col-span-2 flex items-center gap-2">
                  {pictogram.tags.map((tag, i) => (
                    <Link
                      key={i}
                      href={`/dashboard/tags/${tag.id}`}
                      className="bg-primary hover:bg-secondary transition ease-in-out duration-300 text-white w-auto py-1 px-3 rounded-full"
                    >
                      {tag.title}
                    </Link>
                  ))}
                </td>
                <Separator n={3} />
                {pictogram.tags.some((el) => el.id == 3) && (
                  <>
                    {pictogram.type == "verbe" && (
                      <>
                        <th className="text-start col-span-1 flex items-center">
                          Participe passé:
                        </th>
                        <td className="text-start col-span-2 flex items-center">
                          {pictogram.irregular.pastParticiple}
                        </td>
                        <Separator n={3} />
                      </>
                    )}
                    {pictogram.type == "nom" && (
                      <>
                        <th className="text-start col-span-1 flex items-center">
                          Pluriel
                        </th>
                        <td className="text-start col-span-2 flex items-center">
                          {pictogram.irregular.plurial}
                        </td>
                        <Separator n={3} />
                      </>
                    )}
                    {pictogram.type == "adjectif" && (
                      <>
                        <th className="text-start col-span-1 flex items-center">
                          Féminin
                        </th>
                        <td className="text-start col-span-2 flex items-center">
                          {pictogram.irregular.feminin}
                        </td>
                        <Separator n={3} />
                        <th className="text-start col-span-1 flex items-center">
                          Féminin pluriel
                        </th>
                        <td className="text-start col-span-2 flex items-center">
                          {pictogram.irregular.plurial}
                        </td>
                        <Separator n={3} />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </tr>
        </tbody>
      </table>
      {pictogram.tags.some((el) => el.id == 3) && pictogram.type == "verbe" && (
        <table className="table w-full">
          <thead className="*:grid *:grid-cols-3">
            <tr className="px-2">
              <th className="col-span-3 text-lg md:text-xl flex justify-center items-center">
                Conjugaisons
              </th>
              <Separator n={3} />
            </tr>
          </thead>
          <tbody className="*:grid *:grid-cols-3">
            {pictogram.irregular.conjugations.map((c, i) => (
              <tr key={i} className="text-sm sm:text-base px-2">
                <th className="text-start capitalize col-span-1 flex items-center">
                  {c.tense}
                </th>
                <td className="text-start col-span-2 flex flex-col items-start">
                  <div>{c.firstSingular}</div>
                  <div>{c.secondSingular}</div>
                  <div>{c.thirdSingular}</div>
                  <div>{c.firstPlurial}</div>
                  <div>{c.secondPlurial}</div>
                  <div>{c.thirdPlurial}</div>
                </td>
                <Separator n={3} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Pictogram;
