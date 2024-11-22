import UserProfile from "@/_components/dashboard/profile/userProfile";
import { getAllByOtherAsList } from "@/_utils/entityApiUtil";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { jwtDecode } from "jwt-decode";

const page = async ({ searchParams }) => {
  const accessToken = getAccessToken();
  const user = accessToken ? jwtDecode(accessToken?.value) : null;
  const patients = await getAllByOtherAsList(
    "patients",
    "user",
    user.id,
    accessToken
  );
  const notes = await getAllByOtherAsList(
    "notes",
    "user",
    user.id,
    accessToken
  );
  const { verify } = searchParams;
  
  return (
    <UserProfile
      user={user}
      notes={notes.map((note) => ({
        ...note,
        user: null,
        patient:
          note.patient.firstName.charAt(0) + ". " + note.patient.lastName,
      }))}
      patients={patients}
      verify={verify}
    />
  );
};

export default page;
