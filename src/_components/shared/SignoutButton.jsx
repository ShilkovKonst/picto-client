import { SignoutIcon } from "@/_components/icons";

const SignoutButton = ({ handleSignOut }) => {
  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="w-10 h-10 bg-primary hover:bg-secondary transition duration-300 ease-in-out rounded-full overflow-hidden flex justify-center items-center"
    >
      <SignoutIcon />
    </button>
  );
};

export default SignoutButton;
