"use client";
import { useState } from "react";
import LayoutNavModalBody from "./LayoutNavModalBody";
import LayoutNavModalButton from "./LayoutNavModalButton";

const LayoutNavModal = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative group">
      <LayoutNavModalButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <LayoutNavModalBody session={session} isOpen={isOpen} />
    </div>
  );
};

export default LayoutNavModal;
