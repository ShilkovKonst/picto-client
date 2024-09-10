import {
  createOne as createOneCat,
  updateOneById as updateOneCatById,
} from "@/_helpers/categoryApiHelper";
import {
  createOne as createOneQuest,
  updateOneById as updateOneQuestById,
} from "@/_helpers/questionApiHelper";
import {
  createOne as createOnePicto,
  updateOneById as updateOnePictoById,
} from "./pictoApiHelper";
import {
  createOne as createOneTag,
  updateOneById as updateOneTagById,
} from "./tagApiHelper";

export const createCategory = async (router, formData) => {
  const response = await createOneCat(formData);
  router.push(`/dashboard/categories/${response.id}`);
};
export const updateCategory = async (entity, router, formData) => {
  const response = await updateOneCatById(entity?.id, formData);
  router.push(`/dashboard/categories/${response.id}`);
};

export const createQuestion = async (router, formData) => {
  const response = await createOneQuest(formData);
  router.push(`/dashboard/questions/${response.id}`);
  console.log(response);
};
export const updateQuestion = async (entity, router, formData) => {
  const response = await updateOneQuestById(entity?.id, formData);
  router.push(`/dashboard/questions/${response.id}`);
};

export const createPictogram = async (router, formData) => {
  const response = await createOnePicto(formData);
  router.push(`/dashboard/pictograms/${response.id}`);
};
export const updatePictogram = async (entity, router, formData) => {
  const response = await updateOnePictoById(entity?.id, formData);
  router.push(`/dashboard/pictograms/${response.id}`);
};

export const createTag = async (router, formData) => {
  const response = await createOneTag(formData);
  router.push(`/dashboard/tags/${response.id}`);
  console.log(response);
};
export const updateTag = async (entity, router, formData) => {
  const response = await updateOneTagById(entity?.id, formData);
  router.push(`/dashboard/tags/${response.id}`);
};
////////////////////////////////////////////////////////////////////////
export const categoryFormData = (form, formData) => {
  form.imageFileReq && formData.append("imageFileReq", form.imageFileReq);
  formData.append("supercategory", form.supercategory);
  formData.append("questions", JSON.stringify(form.questions));
};

export const pictoFormData = (form, formData) => {
  form.imageFileReq && formData.append("imageFileReq", form.imageFileReq);
  formData.append("type", form.type);
  formData.append("category", form.category);
  formData.append("tags", JSON.stringify(form.tags));
  form.tags.includes("3") && formData.append("irregular", JSON.stringify(form.irregular));
};
