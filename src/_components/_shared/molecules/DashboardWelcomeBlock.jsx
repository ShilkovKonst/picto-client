import SignoutButton from "../atoms/SignoutButton";

const DashboardWelcomeBlock = ({ session, handleSignOut }) => {
  return (
    <div className="flex flex-row justify-between gap-3 items-center">
      <div className="flex flex-col justify-center items-center text-end">
        <p className="ml-auto">Bienvenue,</p>
        <p className="font-semibold">
          {session.job} {session.firstName} {session.lastName}
        </p>
      </div>
      <SignoutButton handleSignOut={handleSignOut} />
    </div>
  );
};

export default DashboardWelcomeBlock;
