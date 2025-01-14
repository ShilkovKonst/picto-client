import Accueil from "./Accueil";

export default async function Home(props) {
  const searchParams = await props.searchParams;
  const { passwordResetted } = searchParams;
  return <Accueil passwordResetted={passwordResetted} />;
}
