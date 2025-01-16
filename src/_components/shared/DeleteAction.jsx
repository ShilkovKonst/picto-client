"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import ButtonAction from "./ButtonAction";
import { RemoveIcon } from "@/_components/icons";
import { deleteOneById } from "@/_lib/entityApiUtil";

const DeleteAction = ({ entity, entityName, isSublist }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [toDelete, setToDelete] = useState(false);

  const handleClick = async () => {
    try {
      const response = await deleteOneById(entity.id, entityName);
      if (response.status == 205) {
        setToDelete(false);
        pathname.split("/").length > 3 &&
          router.push(`/dashboard/${entityName}?`);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      throw new Error(
        "Une erreur s'est produite lors de l'envoi du message. " + error.message
      );
    }
  };

  return (
    <>
      <ButtonAction
        handleClick={() => setToDelete(true)}
        isSublist={isSublist}
        icon={<RemoveIcon isSublist={isSublist} />}
        title={"Effacer"}
        position={"top"}
        type="alert"
      />
      <DeleteModal
        entity={entity}
        toDelete={toDelete}
        handleDelete={() => handleClick()}
        handleCancel={() => setToDelete(false)}
      />
    </>
  );
};

export default DeleteAction;

// async function deleteOneById(id, entityName) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/api/${entityName}/${id}`,
//       {
//         method: "DELETE",
//         credentials: "include",
//       }
//     );
//     if (!response.ok) {
//       const errorDetails = await response.json();
//       throw new Error(`${errorDetails.message}`);
//     }
//     return response.json();
//   } catch (error) {
//     console.error("Bad credentials:", error.message);
//   }
// }
