"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const MediaField = ({ entity, entityName, isSublist }) => {

  return (
    <td className="flex justify-center md:justify-start w-1/3 md:w-1/5">
      <Link href={`/dashboard/${entityName}/${entity?.id}`}>
        {entity?.media?.imageFileRes && (
          <Image
            className={`${isSublist ? "h-14 w-14" : "h-16 w-16 md:h-14 md:w-14"}`}
            src={`data:${entity?.media?.imageFileRes.type};base64,${entity?.media?.imageFileRes.imageBase64}`}
            alt={entity?.media?.imageName}
            width={40}
            height={40}
          />
        )}
      </Link>
    </td>
  );
};

export default MediaField;
