"use client";
import { useState } from "react";
import LayoutNavModalBody from "./LayoutNavModalBody";
import LayoutNavModalButton from "./LayoutNavModalButton";

const LayoutNavModal = ({ session, isOpen, setIsOpen }) => {
  return (
    <div className="relative group">
      <LayoutNavModalButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <LayoutNavModalBody
        session={session}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default LayoutNavModal;
