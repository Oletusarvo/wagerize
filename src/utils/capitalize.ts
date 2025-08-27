export const capitalize = (str: string) => {
  let capitalized = [...str];
  capitalized[0] = str.at(0).toUpperCase();
  return capitalized.join('');
};
