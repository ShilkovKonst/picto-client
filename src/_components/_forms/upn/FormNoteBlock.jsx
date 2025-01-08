import { useEffect } from "react";
import LoadingSpinner from "@/_components/_shared/LoadingSpinner";
import FormSelectListField from "@/_components/_forms/shared/FormSelectListField";
import FormTextAreaField from "@/_components/_forms/shared/FormTextAreaField";
import FormTextField from "@/_components/_forms/shared/FormTextField";

const FormNoteBlock = ({
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
        {form.estimation != undefined ? (
          <FormTextField
            id={"estimation"}
            title={"Estimation:"}
            defaultValue={form.estimation}
            handleChange={handleChange}
          />
        ): (
          <LoadingSpinner text={"Loading estimation..."} />
        )}
        {form.comment != undefined ? (
          <FormTextAreaField
            id={"comment"}
            title={"Commentaire:"}
            defaultValue={form.comment}
            handleChange={handleChange}
            limit={1000}
            length={form.comment.length}
          />
        ): (
          <LoadingSpinner text={"Loading commentaire..."} />
        )}
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-0 lg:gap-3 *:mt-5 *:w-full">
        {form.userId ? (
          <FormSelectListField
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
          <FormSelectListField
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

export default FormNoteBlock;
