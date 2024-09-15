import EntityList from '@/_components/dashboard/EntityList';
import { getAll } from '@/_helpers/questionApiHelper';
import React from 'react'

const page = async ({ searchParams }) => {
  const data = await getAll(searchParams.page ?? 0, searchParams.size ?? 5);
  console.log(data);

  return <EntityList data={data?.content?.length > 0 ? data : null} entityName="questions" />;
}

export default page