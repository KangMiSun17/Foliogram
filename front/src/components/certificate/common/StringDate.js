/**
 * Change date object format
 * input : Date Object
 * return : "YYYY-MM-DD"
 **/
export const StringDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month >= 10 ? month : "0" + month}-${
    day >= 10 ? day : "0" + day
  }`;
};
