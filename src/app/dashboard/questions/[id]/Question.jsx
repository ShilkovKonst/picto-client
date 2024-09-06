"use client";
import React from "react";
import { Accordion } from "flowbite-react";
import Link from "next/link";
import EntityHead from "@/_components/dashboard/_entityHead";

const Question = ({ question, categories }) => {
  return (
    <>
      <table className="table w-full">
        {question && <EntityHead entity={question} entityName="questions" />}
      </table>
      <Accordion collapseAll alwaysOpen>
        {categories && (
          <Accordion.Panel>
            <Accordion.Title>Catégories associées</Accordion.Title>
            <Accordion.Content>
              <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                {categories?.length > 0 &&
                  categories?.map((c, i) => (
                    <li key={i}>
                      <Link
                        href={`/dashboard/categories/${c?.id}`}
                        className="text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        {c?.title}
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

export default Question;
