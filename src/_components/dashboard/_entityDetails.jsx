import React from 'react'
import EntityDetailsImage from './_entityDetailsImage'

const EntityDetails = ({ entity, entityName }) => {
    return (
        <tbody className="flex flex-col gap-2">
            {entity && (
                <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-center text-sm sm:text-base p-2 border-b">
                    {
                        (entityName == "categories" || entityName == "pictograms") &&
                        <EntityDetailsImage entity={entity} />
                    }

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
    )
}

export default EntityDetails