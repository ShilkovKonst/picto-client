import EntityList from '@/_components/dashboard/EntityList';
import { getAllAsList } from '@/_helpers/pictoApiHelper';
import React from 'react'

const page = async () => {
  const data = await getAllAsList();
  console.log(data);
  return <EntityList data={data ?? null} entityName="pictograms" />;
}

export default page