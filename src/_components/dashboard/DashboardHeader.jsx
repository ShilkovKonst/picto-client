"use client";
import { useRouter } from "next/navigation";
import DashboardWelcomeBlock from "@/_components/dashboard/DashboardWelcomeBlock";
import HeaderImage from "../shared/HeaderImage";

const DashboardHeader = ({ session }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    const response = await fetch("/api/auth/signOut");
    router.push(`/`);
    router.refresh();
  };

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div><HeaderImage width={100} /></div>
      {session && (
        <DashboardWelcomeBlock
          session={session}
          handleSignOut={handleSignOut}
        />
      )}
    </div>
  );
};

export default DashboardHeader;
