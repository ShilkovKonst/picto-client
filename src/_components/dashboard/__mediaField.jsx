"use client";
import Image from "next/image";

const MediaField = ({ entity, entityName, isSublist }) => {
  return (
    <div className="flex justify-center md:justify-start">
      {entity?.media?.imageFileRes && (
        <Image
          className={`${isSublist ? "h-12 w-12" : "h-16 w-16 md:h-14 md:w-14"}`}
          src={`data:${entity?.media?.imageFileRes.type};base64,${entity?.media?.imageFileRes.imageBase64}`}
          alt={entity?.media?.imageName}
          width={40}
          height={40}
        />
      )}
    </div>
  );
};

export default MediaField;
