import EntityUpdate from '@/_components/dashboard/EntityUpdate';
import { getAll } from '@/_helpers/questionApiHelper';
import React from 'react'

const page = async () => {

  return <EntityUpdate entity={null} entityName="questions" />;
}

export default page