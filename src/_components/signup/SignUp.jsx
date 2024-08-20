import React from "react";
import SignUpForm from "./signUpForm";

const SignUp = () => {
  return (
    <div className="flex flex-col md:flex-row w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 h-full md:h-[95%] bg-pform sm:rounded-xl overflow-hidden relative ml-auto mr-auto">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
