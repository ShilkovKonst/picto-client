export const checkRegex = (e, name, regex, state, setState) => {
  if (e.target.name == name && !regex.test(e.target.value) && !state) {
    setState(true);
  }
  if (e.target.name == name && regex.test(e.target.value) && state) {
    setState(false);
  }
};
