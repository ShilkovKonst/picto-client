import LoginForm from "@/_components/_forms/LoginForm";
import GuestMode from "../GuestMode";

const Body = ({ passwordResetted }) => {
  return (
    <main className="grid grid-cols-5 *:p-4">
      <div className="col-span-2 text-center">
        <LoginForm passwordResetted={passwordResetted} />
      </div>
      <div className="col-span-3">
        <GuestMode />
      </div>
    </main>
  );
};

export default Body;
