"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import RemoveIcon from "../icons/removeIcon";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const ActionDelete = ({ entity, entityName, isSublist }) => {
  const pathname = usePathname();
  const [perPage, setPerPage] = useState(5);
  const router = useRouter();
  const [toDelete, setToDelete] = useState(false);

  useEffect(() => {
    const itemsPerPage = localStorage.getItem("itemsPerPage");
    if (itemsPerPage) {
      setPerPage(itemsPerPage);
    }
  }, []);

  const handleClick = async () => {
    try {
      const response = await deleteOneById(entity.id, entityName);
      if (response.status == 205) {
        setToDelete(false);
        pathname.split("/").length > 3 &&
          router.push(`/dashboard/${entityName}?size=${perPage}`);
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
      <button
        onClick={() => setToDelete(true)}
        className={`group relative bg-pbg hover:bg-pred transition ease-in-out duration-300 ${
          isSublist ? "h-5" : "h-10"
        } w-10 rounded-3xl  font-bold tracking-[1.25px] border-none outline-none flex flex-row justify-center items-center my-1 text-xs sm:text-sm`}
      >
        <RemoveIcon isSublist={isSublist} />
        <div className="hidden group-hover:block absolute bottom-[100%] left-0 pb-1 rounded-lg cursor-default">
          <p className="text-xs text-black">Effacer</p>
        </div>
      </button>
      <Modal show={toDelete} size="md" onClose={() => setToDelete(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Êtes-vous sûr(e) de vouloir supprimer cette catégorie{" "}
              {entity.title} ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleClick()}>
                Oui, je suis sûr(e)
              </Button>
              <Button color="gray" onClick={() => setToDelete(false)}>
                Non, annuler
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ActionDelete;

async function deleteOneById(id, entityName) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/api/${entityName}/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`${errorDetails.message}`);
    }
    return response.json();
  } catch (error) {
    console.error("Bad credentials:", error.message);
  }
}
