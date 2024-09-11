import EntityList from '@/_components/dashboard/EntityList';
import { getAll } from '@/_helpers/questionApiHelper';
import React from 'react'

const page = async () => {
  const data = await getAll();

  return <EntityList data={data?.content?.length > 0 ? data : null} entityName="questions" />;
}

export default page