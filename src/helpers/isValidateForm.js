export const isValidateForm = (userData) => {
  let res = [];
  Object.values(userData).forEach((v) => {
    if (Array.isArray(v)) {
      res.push(...v);
    } else {
      res.push(v);
    }
  });
  return !res.includes('');
};
