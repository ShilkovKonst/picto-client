import SignUpForm from "@/_components/signup/signUpForm";
import React from "react";

const SignUp = ({ institutions }) => {
  return (
    <div className="flex flex-col md:flex-row w-full lg:w-3/4 xl:w-2/3 h-full min-h-svh lg:min-h-0 lg:h-[95%] bg-pform lg:rounded-xl overflow-hidden relative ml-auto mr-auto">
      <SignUpForm institutions={institutions} />
    </div>
  );
};

export default SignUp;
