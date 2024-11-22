import { Label, Select, Spinner, Textarea, TextInput } from "flowbite-react";
import { useEffect } from "react";

const EntityFormNoteFields = ({
  form,
  setForm,
  handleChange,
  session,
  note,
  users,
  patients,
}) => {
  useEffect(() => {
    setForm({
      ...form,
      estimation: note?.estimation ?? "",
      comment: note?.comment ?? "",
      userId: note?.user.id ?? session.id,
      patientId: note?.patient.id ?? -1,
    });
  }, []);

  return (
    <>
      <div className="flex flex-col justify-evenly items-center gap-0 lg:gap-3 *:mt-5 *:w-full">
        <div>
          <Label htmlFor="estimation" value={`Estimation`} />
          <TextInput
            id="estimation"
            type={`text`}
            sizing="md"
            name="estimation"
            onChange={handleChange}
            value={form.estimation ?? ""}
            required
          />
        </div>
        <div>
          <Label htmlFor="comment" value={`Commentaire`} />
          <Textarea
            id="comment"
            type={`text`}
            sizing="md"
            name="comment"
            onChange={handleChange}
            value={form.comment ?? ""}
            rows={3}
            required
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-0 lg:gap-3 *:mt-5 *:w-full">
        <div>
          <Label htmlFor="userId" value={`Thérapeute`} />
          {form.userId ? (
            <Select
              id="userId"
              name="userId"
              className="input-text md:mb-4 pl-0"
              onChange={handleChange}
              defaultValue={form.userId}
              required
            >
              <option value={-1}>Choisir un thérapeute</option>
              {users &&
                users
                  .sort((a, b) =>
                    a.institution.title.localeCompare(b.institution.title)
                  )
                  .map((user, i) => (
                    <option key={i} value={user.id}>
                      {user.institution.title +
                        " - " +
                        user.firstName.charAt(0) +
                        ". " +
                        user.lastName}
                    </option>
                  ))}
            </Select>
          ) : (
            <div className="flex justify-center items-center w-full">
              <Spinner className="" aria-label="Loading théraputes..." />
              <p className="pl-2">Loading thérapeutes...</p>
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="patientId" value={`Patient`} />
          {form.userId ? (
            <Select
              id="patientId"
              name="patientId"
              className="input-text md:mb-4 pl-0"
              onChange={handleChange}
              defaultValue={form.patientId}
              required
            >
              <option value={-1}>Choisir un patient</option>
              {patients &&
                patients.map((patient, i) => (
                  <option key={i} value={patient.id}>
                    {patient.firstName.charAt(0) + ". " + patient.lastName}
                  </option>
                ))}
            </Select>
          ) : (
            <div className="flex justify-center items-center w-full">
              <Spinner className="" aria-label="Loading théraputes..." />
              <p className="pl-2">Loading patients...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EntityFormNoteFields;
