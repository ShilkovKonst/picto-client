"use client"
import React from "react";
import { Accordion } from "flowbite-react";
import Link from "next/link";
import EntityHead from "@/_components/dashboard/_entityHead";

const Tag = ({ tag }) => {
  console.log(tag)
  return (
    <>
      <table className="table w-full">
        {tag && <EntityHead entity={tag} entityName="tags" />}
      </table>
      <Accordion collapseAll alwaysOpen>
        {tag?.pictograms && (
          <Accordion.Panel>
            <Accordion.Title>Pictogrammes associés</Accordion.Title>
            <Accordion.Content>
              <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                {tag?.pictograms?.length > 0 &&
                  tag?.pictograms?.map((p, i) => (
                    <li key={i}>
                      <Link
                        href={`/dashboard/pictograms/${p?.id}`}
                        className="text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        {p?.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </Accordion.Content>
          </Accordion.Panel>
        )}
      </Accordion>
    </>
  );
};

export default Tag;
