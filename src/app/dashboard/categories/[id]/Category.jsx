"use client";
import Image from "next/image";
import Link from "next/link";
import Accordion from "@/_components/shared/Accordion";
import Separator from "@/_components/shared/Separator";
import EntityHeader from "@/_components/dashboard/EntityHeader";
import CategoryItem from "./CategoryItem";

const Category = ({
  session,
  category,
  pictograms,
  questions,
  subcategories,
}) => {
  
  return (
    <>
      <section className="table w-full">
        {category && (
          <EntityHeader
            entity={category}
            entityName="categories"
            session={session}
          />
        )}
        {category && (
          <div className="text-sm sm:text-base *:grid *:grid-cols-3">
            <CategoryItem
              title="Image:"
              content={
                category?.media?.imageFileRes && (
                  <Image
                    className="h-14 w-14 md:h-16 md:w-16"
                    src={`data:${category?.media?.imageFileRes.type};base64,${category?.media?.imageFileRes.imageBase64}`}
                    alt={category?.media?.imageName}
                    width={60}
                    height={60}
                  />
                )
              }
            />
            {category.supercategory && (
              <CategoryItem
                title="Super category:"
                content={
                  <Link
                    href={`/dashboard/categories/${category.supercategory?.id}`}
                    className="py-1 px-3 rounded-full text-white hover:text-black bg-primary hover:bg-secondary transition ease-in-out duration-300"
                  >
                    {category.supercategory.title}
                  </Link>
                }
              />
            )}
            <Separator n={3} />
          </div>
        )}
      </section>
      <Accordion
        session={session}
        initial="pictograms"
        entities={[
          {
            name: "pictograms",
            list: pictograms?.sort((a, b) => a.title.localeCompare(b.title)),
          },
          { name: "questions", list: questions },
          {
            name: "categories",
            list: subcategories?.sort((a, b) => a.title.localeCompare(b.title)),
          },
        ]}
      />
    </>
  );
};

export default Category;
