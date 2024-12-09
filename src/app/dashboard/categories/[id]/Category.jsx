"use client";
import Image from "next/image";
import Link from "next/link";
import Accordion from "@/_components/dashboard/_accordion";
import EntityHead from "@/_components/dashboard/_entityHead";
import Separator from "@/_components/common/separator";

const Category = ({
  session,
  category,
  pictograms,
  questions,
  subcategories,
}) => {
  return (
    <>
      <table className="table w-full">
        {category && <EntityHead entity={category} entityName="categories" />}
        <tbody className="*:grid *:grid-cols-3">
          {category && (
            <tr className="text-sm sm:text-base">
              <Separator n={3} />
              <th className="text-start col-span-1 flex items-center">
                Image:
              </th>
              <td className="text-start col-span-2">
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
              <Separator n={3} />
              {category.supercategory && (
                <>
                  <th className="text-start col-span-1 flex items-center">
                    Super category:{" "}
                  </th>
                  <td className="text-start col-span-2 flex items-center">
                    <Link
                      href={`/dashboard/categories/${category.supercategory?.id}`}
                      className="p-2 rounded-full text-white hover:text-black bg-primary hover:bg-secondary transition ease-in-out duration-300"
                    >
                      {category.supercategory.title}
                    </Link>
                  </td>
                  <Separator n={3} />
                </>
              )}
            </tr>
          )}
        </tbody>
      </table>
      <Accordion
        session={session}
        initial="pictograms"
        entities={[
          { name: "pictograms", entityList: pictograms },
          { name: "questions", entityList: questions },
          { name: "categories", entityList: subcategories },
        ]}
      />
    </>
  );
};

export default Category;
