import React from "react";
import { Form, FormCheck } from "react-bootstrap";

/**
 * @param {string} value object value
 * @param {string} name object key
 * @param {string} placeholder Change state when CancleButton onClick
 * @param {function} changeFunction
 * @returns {component} FormTextField
 */
export const FormTextField = ({ value, name, placeholder, changeFunction }) => {
  return (
    <Form.Group className="mb-3" controlId="formTextField">
      <Form.Control
        type="text"
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(e) =>
          changeFunction((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
      />
    </Form.Group>
  );
};

/**
 * @param {function} setState Change state when plusButton onClick
 * @returns {component} PlusButton
 */
export const FormCheckField = ({
  label,
  id,
  value,
  checked,
  checkFunction,
}) => {
  return (
    <FormCheck
      inline
      label={label}
      id={id}
      type="radio"
      name="position"
      value={value}
      checked={checked}
      onChange={(e) => checkFunction(e.target.value)}
    />
  );
};
