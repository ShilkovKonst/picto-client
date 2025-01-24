"use client";
import { CreateIcon } from "../icons";
import LinkButtonAction from "../shared/LinkAction";
import {
  isAdmin,
  isNotInstitutionsOrUsersOrPatientsOrNotes,
  isSessionsInstitution,
  isSessionsPatientOrNote,
  isSuperAdmin,
} from "@/_lib/checkConditions";

const EntityTableHeader = ({ entityName, session }) => {
  const updateDeleteCondition =
    isSuperAdmin(session) ||
    isAdmin(session) ||
    isNotInstitutionsOrUsersOrPatientsOrNotes(entityName);
  return (
    <tr
      className={`grid justify-between items-center *:text-sm *:md:text-base pt-4 pb-2 border-b border-gray-300 ${
        entityName == "users" || entityName == "patients"
          ? "grid-cols-8"
          : entityName == "notes"
          ? "grid-cols-4"
          : entityName == "pictograms" || entityName == "categories"
          ? "grid-cols-3"
          : "grid-cols-2"
      }`}
    >
      <th
        className={`text-center md:text-start ${
          (entityName == "users" || entityName == "patients") &&
          (isSuperAdmin(session) || isAdmin(session))
            ? "col-span-2"
            : entityName == "users" || entityName == "patients"
            ? "col-span-4"
            : "col-span-1"
        }`}
      >
        {entityName != "notes" &&
        entityName != "users" &&
        entityName != "patients"
          ? "Titre"
          : entityName == "patients"
          ? "Patient"
          : "Thérapeute"}
      </th>
      {(entityName == "users" || entityName == "patients") &&
        (isSuperAdmin(session) || isAdmin(session)) && (
          <th className="text-center md:text-start col-span-2">Institution</th>
        )}
      {(entityName == "categories" || entityName == "pictograms") && (
        <th className="text-center md:text-start">Image</th>
      )}
      {entityName == "notes" && (
        <>
          <th className="text-center md:text-start">Patient(e)</th>
          <th className="text-center md:text-start">Estimation</th>
        </>
      )}
      {entityName == "users" && (
        <>
          <th className="text-center md:text-start">Actif</th>
          <th className="text-center md:text-start">Vérifié</th>
        </>
      )}
      {entityName == "patients" && (
        <>
          <th className="text-center md:text-start">Sexe</th>
          <th className="text-center md:text-start">Grade</th>
        </>
      )}
      <th
        className={`relative text-center ${
          entityName == "users" || entityName == "patients"
            ? "col-span-2"
            : "col-span-1"
        }`}
      >
        <p className="mr-2 md:mr-0">Actions</p>
        {session.active && session.verified && updateDeleteCondition && (
          <div className="absolute right-0 top-0 bottom-0 flex justify-center items-center">
            <LinkButtonAction
              href={`/dashboard/${entityName}/create`}
              icon={<CreateIcon />}
              isSublist={false}
              title={"Créer"}
              position="top"
              type="info"
            />
          </div>
        )}
      </th>
    </tr>
  );
};

export default EntityTableHeader;
