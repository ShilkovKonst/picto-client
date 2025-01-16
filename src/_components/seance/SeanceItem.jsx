"use client"
import SeanceAction from "@/_components/shared/SeanceAction";
import { detectMdBreakpoint } from "@/_hooks/detectMdBreakpoint";

const PartnersItem = ({ title, link, icon }) => {
  const isMd = detectMdBreakpoint();
  return <SeanceAction href={link} icon={icon} title={title} isMd={isMd} />;
};

export default PartnersItem;
