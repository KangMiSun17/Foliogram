import DatePicker from "react-datepicker";

/**
 * DatePicker
 * @param {object} startDate Date Object
 * @param {function} setState State function to change when date change
 * @returns {component} DatePicker component
 */
export const DatePickForm = ({ startDate, setState }) => {
  return (
    <DatePicker selected={startDate} onChange={(date) => setState(date)} />
  );
};

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
