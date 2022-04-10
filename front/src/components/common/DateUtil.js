function checkedDigit(value) {
  if (value < 10) {
    return `0${value}`;
  }

  return value;
}

/**
 * Change date object format to String
 * @param {object} date Date Object
 * @returns {String} "YYYY-MM-DD"
 **/
export const toStringDate = (date) => {
  const year = date.getFullYear();
  const month = checkedDigit(date.getMonth() + 1);
  const day = checkedDigit(date.getDate());

  return [year, month, day].join("-");
};

/**
 * Change date String format to Object
 * @param {String} date "YYYY-MM-DD"
 * @returns {object} Date Object
 **/
export const toObjectDate = (date) => {
  return new Date(date);
};
