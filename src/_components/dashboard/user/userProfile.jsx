import React from "react";
import UserActions from "./userActions";
import WarningIcon from "@/_components/icons/warningIcon";
import SuccessIcon from "@/_components/icons/successIcon";

const user = {
  lastName: "last name",
  firstName: "first name",
  email: "email",
  job: "job",
  isActive: false,
  isVerified: false,
  institution: {
    title: "institution",
  },
};

const UserProfile = () => {
  return (
    <table className="table w-full">
      <thead>
        <tr className=" border-b w-auto">
          <th className="text-lg flex justify-center items-center">
            <span className="font-bold mx-auto flex justify-center items-center gap-3 relative group">
              Profil
              {user.isActive ? (
                <>
                  <SuccessIcon />
                  <div className="hidden group-hover:block absolute top-6 -right-16 w-52 rounded-lg alert-success p-4">
                    <p className="font-normal text-sm text-green-800">
                      Votre compte est actif.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <WarningIcon />
                  <div className="hidden group-hover:block absolute top-6 -right-16 w-52 rounded-lg alert-danger p-4">
                    <p className="font-normal text-sm text-red-800">
                      Votre compte est inactif.
                    </p>
                  </div>
                </>
              )}
            </span>
            {user.isActive && (
              <UserActions
                path1="/dashboard/profile/update"
                path2="/dashboard/profile/desactivate"
              />
            )}
          </th>
        </tr>
      </thead>
      <tbody className="flex flex-col gap-2 w-full">
        <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
          <th className="text-start w-[40%] lg:w-[20%]">Nom</th>
          <td className="text-start w-[45%] lg:w-[30%]">{user.lastName}</td>
          <th className="text-start w-[40%] lg:w-[20%]">Prénom</th>
          <td className="text-start w-[45%] lg:w-[30%]">{user.firstName}</td>
        </tr>
        <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
          <th className="text-start w-[40%] lg:w-[20%]">Fonction</th>
          <td className="text-start w-[45%] lg:w-[30%]">{user.job}</td>
          <th className="text-start w-[40%] lg:w-[20%]">Institution</th>
          <td className="text-start w-[45%] lg:w-[30%]">
            {user.institution.title}
          </td>
        </tr>
        <tr className="flex flex-row flex-wrap gap-1 lg:gap-0 justify-start items-start md:items-center text-sm sm:text-base p-2 border-b">
          <th className="text-start w-[20%] lg:w-[15%]">Email</th>
          <td className="text-start flex items-center w-[75%] lg:w-[55%]">
            {user.email}
            <div className="relative group text-center w-auto ml-1">
              {user.isVerified ? (
                <>
                  <SuccessIcon />
                  <div className="hidden group-hover:block absolute bottom-6 -right-36 w-72 rounded-lg alert-success p-4">
                    <p className="text-green-800">Votre email est vérifié.</p>
                  </div>
                </>
              ) : (
                <>
                  <WarningIcon />
                  <div className="hidden group-hover:block absolute bottom-6 -right-36 w-72 rounded-lg alert-danger p-4">
                    <p className="text-red-800">
                      Votre email n&apos;est pas vérifié.
                    </p>
                    <a
                      className="font-semibold underline decoration-1"
                      href="{{ path('app_verify_email_resend') }}"
                    >
                      Renvoyer l&apos;email de vérification
                    </a>
                  </div>
                </>
              )}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserProfile;
