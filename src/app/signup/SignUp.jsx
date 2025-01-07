import SignUpForm from "@/_components/_forms/signUpForm";

const SignUp = ({ institutions }) => {
  return (
    <div className="flex flex-col md:flex-row w-full md:w-3/4 xl:w-2/3 h-full min-h-svh md:min-h-0 md:h-[95%] bg-pform md:rounded-xl overflow-hidden relative ml-auto mr-auto">
      <SignUpForm institutions={institutions} />
    </div>
  );
};

export default SignUp;
