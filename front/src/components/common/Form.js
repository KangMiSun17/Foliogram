import React from "react";
import { Form, FormCheck } from "react-bootstrap";

/** Form's text field
 *
 * @param {string} value object value
 * @param {string} name object key
 * @param {string} placeholder text field placeholder
 * @param {function} setState
 * @returns {component} FormTextField
 */
export function FormTextField({ value, name, placeholder, setState }) {
  return (
    <Form.Group className="mb-3" controlId="formTextField">
      <Form.Control
        type="text"
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
      />
    </Form.Group>
  );
}

/** Form's checkbox field
 *
 * @param {string} label checkbox name
 * @param {string} id checkbox id
 * @param {string} value checkbox value
 * @param {condition} checked condition to be checked
 * @param {function} setState set state
 * @returns {component} FormTextField
 */
export function FormCheckField({ label, id, value, checked, setState }) {
  return (
    <FormCheck
      inline
      label={label}
      id={id}
      type="radio"
      name="position"
      value={value}
      checked={checked}
      onChange={(e) => {
        setState(e.target.value);
      }}
    />
  );
}

export function FormDateField() {
  //DatePickForm 을 여기로 옮겼으면 합니다.
}
