import { Accordion } from 'flowbite-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import EntityHead from './_entityHead'

const Entity = ({entity, entityName, categories}) => {
  return (    
    <>
      <table className="table w-full">
      {entity && <EntityHead entity={entity} entityName={entityName} />}
        <tbody className="flex flex-col gap-2">
          {(entityName == "categories" || entityName == "pictograms") && (
            <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-center text-sm sm:text-base p-2 border-b">
              <th className="text-start w-[40%] lg:w-[20%]">Image</th>
              <td className="text-start w-[45%] lg:w-[30%]">
                {imageSrc.length > 0 && (
                  <Image
                    className="h-14 w-14 md:h-16 md:w-16"
                    src={imageSrc}
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
                    <Link href={`/dashboard/categories/${supercategory?.id}`}>
                      {supercategory.title}
                    </Link>
                  </td>
                </>
              )}
            </tr>
          )}
        </tbody>
      </table>
      <Accordion collapseAll alwaysOpen>
        {questions && (
          <Accordion.Panel>
            <Accordion.Title>Questions</Accordion.Title>
            <Accordion.Content>
              <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                {questions?.length > 0 &&
                  questions?.map((q, i) => (
                    <li key={i}>
                      <Link
                        href={`/dashboard/questions/${q?.id}`}
                        className="text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        {q?.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </Accordion.Content>
          </Accordion.Panel>
        )}
        {category?.pictograms && (
          <Accordion.Panel>
            <Accordion.Title>Pictogrammes</Accordion.Title>
            <Accordion.Content>
              <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                {category?.pictograms?.length > 0 &&
                  category?.pictograms?.map((pict, i) => (
                    <li key={i}>
                      <Link
                        href={`/dashboard/pictograms/${pict.id}`}
                        className="text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        {pict.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </Accordion.Content>
          </Accordion.Panel>
        )}
        {subcategories && (
          <Accordion.Panel>
            <Accordion.Title>Sous-catégories</Accordion.Title>
            <Accordion.Content>
              <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                {subcategories.map((subCat, i) => (
                  <li key={i}>
                    <Link
                      href={`/dashboard/categories/${subCat.id}`}
                      className="text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      {subCat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion.Content>
          </Accordion.Panel>
        )}
      </Accordion>
    </>
  )
}

export default Entity