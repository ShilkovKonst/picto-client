"use client";
import { createOne, updateOne } from "./entityApiUtil";

export const create = async (
  router,
  formData,
  entityName,
  setError,
  setErrorMessage,
  setIsLoading
) => {
  const response = await createOne(formData, entityName);
  if (!response) {
    setIsLoading(false);
    setError(true);
    setErrorMessage(response?.title);
  }
  // status 201 - created
  if (response?.status == 201) {
    router.push(`/dashboard/${entityName}/${response.id}`);
    router.refresh();
  }
};

export const update = async (
  router,
  session,
  formData,
  entity,
  entityName,
  setError,
  setErrorMessage,
  setIsLoading
) => {
  const response = await updateOne(entity.id, entityName, formData);
  console.log("response updateOne", response);
  // status 202 - accepted
  if (response.status == 202) {
    entityName == "users" && session.id == entity.id
      ? router.push(`/dashboard`)
      : router.push(`/dashboard/${entityName}/${response.id}`);
    router.refresh();
  }
  if (response.status >= 400) {
    setIsLoading(false);
    setError(true);
    setErrorMessage(response.title);
  }
};
