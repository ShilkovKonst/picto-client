import { getAllByOtherAsList } from "@/_lib/entityApiUtil";
import getAccessToken from "@/_lib/getAccessTokenUtil";
import UserProfile from "./UserProfile";

const page = async (props) => {
  const searchParams = await props.searchParams;
  const { accessToken, session } = getAccessToken();
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
        user: {
          id: note?.user?.id,
          name:
            note?.user?.firstName?.charAt(0) + ". " + note?.patient?.lastName,
        },
        patient:
          note.patient.firstName.charAt(0) + ". " + note.patient.lastName,
      }))}
      patients={patients}
      verify={verify}
    />
  );
};

export default page;
