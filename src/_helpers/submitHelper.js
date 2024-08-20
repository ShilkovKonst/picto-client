import { createOne as createOneCat, updateOneById as updateOneCatById } from "@/_helpers/categoryApiHelper";
import { createOne as createOneQuest, updateOneById as updateOneQuestById } from "@/_helpers/questionApiHelper";

export const createCategory = async (router, formData) => {
    const response = await createOneCat(formData);
    router.push(`/dashboard/categories/${response.id}`);
}

export const updateCategory = async (entity, router, formData) => {
    const response = await updateOneCatById(entity?.id, formData);
    router.push(`/dashboard/categories/${response.id}`);
}

export const createQuestion = async (router, formData) => {
    const response = await createOneQuest(formData);
    router.push(`/dashboard/questions/${response.id}`);
    console.log(response);
}

export const updateQuestion = async (entity, router, formData) => {
    const response = await updateOneQuestById(entity?.id, formData);
    router.push(`/dashboard/questions/${response.id}`);
}