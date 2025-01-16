"use client";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DeleteModal = ({ entity, handleDelete, handleCancel, toDelete }) => {
  return (
    <Modal show={toDelete} size="md" onClose={handleCancel} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400" />
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Êtes-vous sûr(e) de vouloir supprimer cette catégorie {entity.title}
             ?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDelete}>
              Confirmer
            </Button>
            <Button color="gray" onClick={handleCancel}>
              Annuler
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
