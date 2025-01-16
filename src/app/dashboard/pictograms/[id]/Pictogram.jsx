"use client";
import Image from "next/image";
import Link from "next/link";
import EntityHeader from "@/_components/dashboard/EntityHeader";
import Separator from "@/_components/_shared/Separator";
import PictogramItem from "./PictogramItem";

const Pictogram = ({ session, pictogram }) => {
  return (
    <>
      <section className="table w-full">
        {pictogram && (
          <EntityHeader
            session={session}
            entity={pictogram}
            entityName={"pictograms"}
          />
        )}
        <div className="text-sm sm:text-base p-1 *:grid *:grid-cols-3">
          {pictogram?.media?.imageFileRes && (
            <>
              <PictogramItem
                title={"Image:"}
                content={
                  pictogram?.media?.imageFileRes ? (
                    <Image
                      className="h-14 w-14 md:h-16 md:w-16"
                      src={`data:${pictogram?.media?.imageFileRes.type};base64,${pictogram?.media?.imageFileRes.imageBase64}`}
                      alt={pictogram?.media?.imageName}
                      width={60}
                      height={60}
                    />
                  ) : (
                    <p>none</p>
                  )
                }
              />
              {pictogram.category ? (
                <>
                  <PictogramItem
                    title={"Category:"}
                    content={
                      <Link
                        href={`/dashboard/categories/${pictogram.category.id}`}
                        className="py-1 px-3 rounded-full text-white text-center hover:text-black bg-primary hover:bg-secondary transition ease-in-out duration-300"
                      >
                        {pictogram.category.title}
                      </Link>
                    }
                  />
                </>
              ) : (
                <div>Il faut ajouter une categorie !</div>
              )}
              <PictogramItem title={"Type:"} content={pictogram.type} />
              <PictogramItem
                title={"Tags:"}
                content={pictogram.tags.map((tag, i) => (
                  <Link
                    key={i}
                    href={`/dashboard/tags/${tag.id}`}
                    className="bg-primary hover:bg-secondary transition ease-in-out duration-300 text-white w-auto py-1 px-3 rounded-full"
                  >
                    {tag.title}
                  </Link>
                ))}
              />
              {pictogram.tags.some((el) => el.id == 3) && (
                <>
                  {pictogram.type == "verbe" && (
                    <>
                      <PictogramItem
                        title={"Participe passé:"}
                        content={pictogram.irregular.pastParticiple}
                      />
                      <Separator n={3} />
                    </>
                  )}
                  {pictogram.type == "nom" && (
                    <>
                      <PictogramItem
                        title={"Pluriel:"}
                        content={pictogram.irregular.plurial}
                      />
                      <Separator n={3} />
                    </>
                  )}
                  {pictogram.type == "adjectif" && (
                    <>
                      <PictogramItem
                        title={"Féminin:"}
                        content={pictogram.irregular.feminin}
                      />
                      <PictogramItem
                        title={"Féminin pluriel:"}
                        content={pictogram.irregular.plurial}
                      />
                      <Separator n={3} />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
      {pictogram.tags.some((el) => el.id == 3) && pictogram.type == "verbe" && (
        <section className="table w-full">
          <div className="">
            <div className="px-2">
              <div className="col-span-3 text-lg md:text-xl flex justify-center items-center font-semibold">
                Conjugaisons
              </div>
            </div>
          </div>
          {pictogram.irregular.conjugations.map((c, i) => (
            <div
              key={i}
              className="text-sm sm:text-base px-2 *:grid *:grid-cols-3"
            >
              <PictogramItem
                title={c.tense}
                content={
                  <div>
                    <div>{c.firstSingular}</div>
                    <div>{c.secondSingular}</div>
                    <div>{c.thirdSingular}</div>
                    <div>{c.firstPlurial}</div>
                    <div>{c.secondPlurial}</div>
                    <div>{c.thirdPlurial}</div>
                  </div>
                }
              />
            </div>
          ))}
          <Separator n={3} />
        </section>
      )}
    </>
  );
};

export default Pictogram;
