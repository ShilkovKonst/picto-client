export const isAdmin = (session) => session?.roles?.includes("ROLE_ADMIN");

export const isSuperAdmin = (session) =>
  session?.roles?.includes("ROLE_SUPERADMIN");

export const isNotSessionUser = (session, entityName, entity) =>
  entityName == "users" && entity?.id != session?.id;

export const isSessionsInstitution = (session, entityName, entity) =>
  ((entityName == "users" ||
    entityName == "patients" ||
    entityName == "notes") &&
    entity?.institution?.id == session?.institution?.id) ||
  entity?.user?.institution?.id == session?.institution?.id;

export const isSessionsPatientOrNote = (session, entityName, entity) =>
  (entityName == "patients" || entityName == "notes") &&
  entity?.user?.id == session?.id;

export const isNotInstitutionsOrUsersOrPatientsorNotes = (entityName) =>
  entityName != "institutions" &&
  entityName != "users" &&
  entityName != "patients" &&
  entityName != "notes";
