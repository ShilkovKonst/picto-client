"use client"
import React, { useState } from "react";
import EntityHead from "@/_components/dashboard/_entityHead";
import Accordion from "@/_components/dashboard/_accordion";

const Tag = ({ tag, pictograms }) => {
  const [isOpenPictos, setIsOpenPictos] = useState(pictograms?.length > 0);
  return (
    <>
      <table className="table w-full">
        {tag && <EntityHead entity={tag} entityName="tags" />}
      </table>
      {pictograms && (
        <Accordion
          state={isOpenPictos}
          setState={setIsOpenPictos}
          entityName={"pictograms"}
          entity={pictograms}
        />
      )}
    </>
  );
};

export default Tag;
