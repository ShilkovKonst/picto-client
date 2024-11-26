import getAccessToken from '@/_utils/getAccessTokenUtil';
import UserProfileDeactivate from './UserProfileDeactivate'
import { jwtDecode } from 'jwt-decode';

const page = () => {
  const accessToken = getAccessToken();
  const session = jwtDecode(accessToken?.value);

  return (
    <UserProfileDeactivate session={session} />
  )
}

export default page