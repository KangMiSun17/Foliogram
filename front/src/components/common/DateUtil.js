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

/**
 * Change date object format to String
 * @param {object} date Date Object
 * @returns {String} "YYYY-MM-DD"
 **/
export const toStringDate = (date) => {
  return date.toISOString().split("T")[0];
};

/**
 * Change date String format to Object
 * @param {String} date "YYYY-MM-DD"
 * @returns {object} Date Object
 **/
export const toObjectDate = (date) => {
  return new Date(date);
};
