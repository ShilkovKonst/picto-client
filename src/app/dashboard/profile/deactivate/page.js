import getAccessToken from '@/_utils/getAccessTokenUtil';
import UserProfileDeactivate from './UserProfileDeactivate'

const page = () => {
  const { accessToken, session } = getAccessToken();

  return (
    <UserProfileDeactivate session={session} />
  )
}

export default page