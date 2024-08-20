import EntityList from '@/_components/dashboard/EntityList';
import { getAll } from '@/_helpers/questionApiHelper';
import React from 'react'

const page = async () => {
  const data = await getAll();
  console.log(data);

  return <EntityList data={data ?? null} entityName="questions" />;
}

export default page