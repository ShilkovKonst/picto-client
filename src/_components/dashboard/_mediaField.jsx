"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getOneMediaFile as getOneMediaFileCat } from "@/_helpers/categoryApiHelper";
import { getOneMediaFile as getOneMediaFilePicto } from "@/_helpers/pictoApiHelper";

const MediaField = ({ entity, entityName }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    entityName == "pictograms" &&
      getOneMediaFilePicto(entity?.media?.id, setImageSrc);
    entityName == "categories" &&
      getOneMediaFileCat(entity?.media?.id, setImageSrc);
  }, [entity?.media?.id, entityName]);

  return (
    <td className="flex justify-center md:justify-start w-1/3 md:w-1/5">
      <Link href={`/dashboard/${entityName}/${entity?.id}`}>
        {imageSrc.length > 0 && (
          <Image
            className="h-10 w-10 md:h-14 md:w-14"
            src={imageSrc}
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
