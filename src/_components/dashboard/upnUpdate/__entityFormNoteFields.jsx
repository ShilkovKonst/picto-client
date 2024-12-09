import LoadingSpinner from "@/_components/shared/LoadingSpinner";
import SelectList from "@/_components/shared/SelectList";
import TextAreaItem from "@/_components/shared/TextAreaItem";
import TextItem from "@/_components/shared/TextItem";
import { useEffect } from "react";

const EntityFormNoteFields = ({
  form,
  setForm,
  handleChange,
  session,
  note,
  users,
  patients,
  patient,
}) => {
  useEffect(() => {
    setForm({
      ...form,
      estimation: note?.estimation ?? "",
      comment: note?.comment ?? "",
      userId: note?.user.id ?? session.id,
      patientId: note?.patient.id ?? patient ?? -1,
    });
  }, []);

  return (
    <>
      <div className="flex flex-col justify-evenly items-center gap-0 lg:gap-3 *:mt-5 *:w-full">
        <TextItem
          id={"estimation"}
          title={"Estimation:"}
          defaultValue={form.estimation}
          handleChange={handleChange}
        />
        <TextAreaItem
          id={"comment"}
          title={"Commentaire:"}
          defaultValue={form.comment}
          handleChange={handleChange}
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-0 lg:gap-3 *:mt-5 *:w-full">
        {form.userId ? (
          <SelectList
            id={"userId"}
            title={"Thérapeute:"}
            defaultValue={form.userId}
            handleChange={handleChange}
            zeroListElement={"Choisir un thérapeute"}
            list={
              session.roles.includes("ROLE_SUPERADMIN")
                ? users
                : session.roles.includes("ROLE_ADMIN")
                ? users.filter(
                    (e) => e.institution.id == session.institution.id
                  )
                : users.filter((e) => e.id == session.id)
            }
          />
        ) : (
          <LoadingSpinner text={"Loading thérapeutes..."} />
        )}
        {form.userId ? (
          <SelectList
            id={"patientId"}
            title={"Patient:"}
            defaultValue={form.patientId}
            handleChange={handleChange}
            zeroListElement={"Choisir un patient"}
            list={
              session.roles.includes("ROLE_SUPERADMIN")
                ? patients
                : session.roles.includes("ROLE_ADMIN")
                ? patients.filter(
                    (e) => e.user.institution.id == session.institution.id
                  )
                : patients.filter((e) => e.id == session.id)
            }
          />
        ) : (
          <LoadingSpinner text={"Loading patients..."} />
        )}
      </div>
    </>
  );
};

export default EntityFormNoteFields;
