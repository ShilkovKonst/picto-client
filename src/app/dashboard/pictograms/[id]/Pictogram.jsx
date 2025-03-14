"use client";
import Image from "next/image";
import Link from "next/link";
import EntityHeader from "@/_components/dashboard/EntityHeader";
import Separator from "@/_components/shared/Separator";
import PictogramItem from "./PictogramItem";
import Accordion from "@/_components/shared/Accordion";
import {
  conjugationNumbers,
  conjugationPersons,
  conjugationTenses,
  irregularId,
  pictoTypesMap,
  tagsMap,
} from "@/_constants/types";

const Pictogram = ({ session, pictogram, questions }) => {
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
              <PictogramItem
                title={"Type:"}
                content={pictoTypesMap[pictogram.type]}
              />
              <PictogramItem
                title={"Tags:"}
                content={pictogram.tags.map((tag, i) => (
                  <Link
                    key={i}
                    href={`/dashboard/tags/${tag.id}`}
                    className="bg-primary hover:bg-secondary transition ease-in-out duration-300 text-white w-auto py-1 px-3 rounded-full"
                  >
                    {tagsMap[tag.title]}
                  </Link>
                ))}
              />
              {pictogram.type == "ADJECTIF" && (
                <PictogramItem
                  title={"Positionnement:"}
                  content={pictogram.tags
                    .filter((t) => t.title != "IRREGULIER")
                    .map((tag, i) => (
                      <p key={i}>
                        {tag.title == "AVANT"
                          ? "avant le nom"
                          : tag.title == "APRES"
                          ? "après le nom"
                          : ""}
                      </p>
                    ))}
                />
              )}
              {irregularId(pictogram.tags) && (
                <>
                  {pictogram.type == "VERBE" && (
                    <>
                      <PictogramItem
                        title={"Participe passé:"}
                        content={pictogram.irregular.pastParticiple}
                      />
                      <Separator n={3} />
                    </>
                  )}
                  {pictogram.type == "NOM" && (
                    <>
                      <PictogramItem
                        title={"Pluriel:"}
                        content={pictogram.irregular.plurial}
                      />
                      <Separator n={3} />
                    </>
                  )}
                  {pictogram.type == "ADJECTIF" && (
                    <>
                      <PictogramItem
                        title={"Pluriel:"}
                        content={pictogram?.irregular?.plurial}
                      />
                      <PictogramItem
                        title={"Féminin:"}
                        content={pictogram?.irregular?.feminin}
                      />
                      <PictogramItem
                        title={"Féminin pluriel:"}
                        content={pictogram?.irregular?.femininPlurial}
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
      {irregularId(pictogram.tags) && pictogram.type == "VERBE" && (
        <section className="table w-full">
          <div className="">
            <div className="px-2">
              <div className="col-span-3 text-lg md:text-xl flex justify-center items-center font-semibold">
                Conjugaisons
              </div>
            </div>
          </div>
          {conjugationTenses.map((t, i) => (
            <div
              key={i}
              className="text-sm sm:text-base px-2 *:grid *:grid-cols-3"
            >
              <PictogramItem
                title={t}
                cls="grid grid-cols-2"
                content={conjugationNumbers.map((n, j) => (
                  <div className="" key={j}>
                    {conjugationPersons.map((p, k) => (
                      <div key={k}>
                        {
                          pictogram.irregular.conjugations[
                            t + "_" + n + "_" + p
                          ]
                        }
                      </div>
                    ))}
                  </div>
                ))}
              />
            </div>
          ))}
          <Separator n={3} />
        </section>
      )}
      <Accordion
        session={session}
        initial={"questions"}
        entities={[{ name: "questions", list: questions }]}
      />
    </>
  );
};

export default Pictogram;
