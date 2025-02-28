"use client";
import { useState } from "react";
import HeaderImage from "../shared/HeaderImage";
import LayoutLegendModal from "./LayoutLegendModal";
import LayoutManagement from "./LayoutManagement";
import LayoutNavModal from "./LayoutNavModal";

const LayoutNav = ({ session }) => {
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <nav className="absolute right-0 top-0 bottom-0 h-screen w-24 bg-pform ">
      <div className="p-1 md:p-3">
        <HeaderImage width={240} />
      </div>
      <LayoutNavModal
        session={session}
        isOpen={isNavOpen}
        setIsOpen={setIsNavOpen}
      />
      <LayoutManagement setIsOpen={setIsLegendOpen} />
      <LayoutLegendModal isOpen={isLegendOpen} setIsOpen={setIsLegendOpen} />
      {isNavOpen && (
        <div
          onClick={() => setIsNavOpen(false)}
          className="fixed top-0 left-0 w-full h-full"
        ></div>
      )}
    </nav>
  );
};

export default LayoutNav;
