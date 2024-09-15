import EntityList from '@/_components/dashboard/EntityList';
import { getAllAsList } from '@/_helpers/pictoApiHelper';
import React from 'react'

const page = async ({ searchParams }) => {
  const data = await getAllAsList(searchParams.page ?? 0, searchParams.size ?? 5);
  return <EntityList data={data ?? null} entityName="pictograms" />;
}

export default page