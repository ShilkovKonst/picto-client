"use client";
import { useState } from "react";
import HeaderImage from "../shared/HeaderImage";
import LayoutNavButton from "./LayoutNavButton";

const LayoutNav = () => {
  return (
    <nav className="absolute right-0 top-0 bottom-0 h-screen w-24 bg-pform ">
      <div className="p-1 md:p-3">
        <HeaderImage width={240} />
      </div>
      <LayoutNavButton />
    </nav>
  );
};

export default LayoutNav;
