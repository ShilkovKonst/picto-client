import { getAllByOtherAsList } from "@/_utils/entityApiUtil";
import getAccessToken from "@/_utils/getAccessTokenUtil";
import { jwtDecode } from "jwt-decode";
import UserProfile from "./UserProfile";

const page = async ({ searchParams }) => {
  const accessToken = getAccessToken();
  const session = accessToken ? jwtDecode(accessToken?.value) : null;
  const patients = await getAllByOtherAsList(
    "patients",
    "user",
    session.id,
    accessToken
  );
  const notes = await getAllByOtherAsList(
    "notes",
    "user",
    session.id,
    accessToken
  );
  const { verify } = searchParams;

  return (
    <UserProfile
      session={session}
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
