import EntityUpdate from '@/_components/dashboard/EntityUpdate';
import { getAll, getOneById } from '@/_helpers/questionApiHelper';
import React from 'react'

const page = async ({params}) => {
  const question = await getOneById(params.id);

  return <EntityUpdate entity={question} entityName="questions" />;
}

export default page