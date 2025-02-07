export const handleCheckboxChange = (e, field, form, setForm) => {
  if (e.target.checked) {
    add(field, e.target.value, form, setForm);
  } else {
    remove(field, e.target.value, form, setForm);
  }
};

const remove = (field, value, form, setForm) => {
  setForm({
    ...form,
    [field]: form[field].filter((item) => item != value),
  });
};
const add = (field, value, form, setForm) => {
  setForm({
    ...form,
    [field]: [...form[field], value],
  });
};
