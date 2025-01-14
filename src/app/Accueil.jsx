"use client";
import { detectMdBreakpoint } from "@/_hooks/detectMdBreakpoint";
import Header from "@/_components/accueil/desktop/Header";
import Body from "@/_components/accueil/desktop/Body";
import Footer from "@/_components/accueil/desktop/Footer";
import SectionForm from "@/_components/accueil/tablette/SectionForm";
import SectionGuest from "@/_components/accueil/tablette/SectionGuest";

const Accueil = ({ passwordResetted }) => {
  const isMd = detectMdBreakpoint();

  return (
    <>
      {isMd == true && (
        <div className="flex flex-col w-full lg:w-3/4 xl:w-2/3 min-h-svh md:min-h-0 h-full lg:h-[95%] bg-pform lg:rounded-xl overflow-hidden relative ml-auto mr-auto">
          <Header />
          <Body passwordResetted={passwordResetted} />
          <Footer />
          <div className="absolute left-[40%] right-[60%] top-0 bottom-0 overflow-hidden shadow-outset-vert-4/10 h-full px-[4px] bg-primary-trans-10 z-20"></div>
        </div>
      )}
      {isMd == false && (
        <main className="block w-full min-h-svh h-full bg-pform overflow-hidden relative ml-auto mr-auto">
          <SectionForm />
          <div className="overflow-hidden shadow-outset-hor-4/10 w-full my-5 py-[4px] bg-primary-trans-10 z-20"></div>
          <SectionGuest />
        </main>
      )}
    </>
  );
};

export default Accueil;
