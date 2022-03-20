import React from "react";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as Api from "../../api";

/**
 * @param {function} submitHandler ConfirmButton onClick handler
 * @param {function} setState Change state when CancleButton onClick
 * @returns {component} Confirm Button and Cancle Button
 */
export const BundleButton = ({ submitHandler, setState }) => {
  return (
    <Row className="justify-content-center" xs="auto">
      <Button
        className="me-3"
        variant="primary"
        type="submit"
        onClick={submitHandler}
      >
        확인
      </Button>
      <Button
        variant="secondary"
        type="button"
        onClick={() => {
          setState(false);
        }}
      >
        취소
      </Button>
    </Row>
  );
};

/**
 * @param {function} setState Change state when plusButton onClick
 * @returns {component} PlusButton
 */
export const PlusButton = ({ setState }) => {
  return (
    <Button variant="primary" onClick={() => setState(true)}>
      +
    </Button>
  );
};

/**
 * @param {function} setState Change state when editButton onClick
 * @returns {component} EditButton
 */
export const EditButton = ({ setState }) => {
  return (
    <Button size="sm" variant="outline-info" onClick={() => setState(true)}>
      편집
    </Button>
  );
};

/**
 * This component return delete button and sends a delete request when clicked
 * @param {Object} props
 * @param {string} props.id id value to be delete
 * @param {function} props.setState State to change after delete
 * @param {number} index Index number of the list to delete, but not require if state is boolean.
 * @returns {component} DeleteButton
 */
export const DeleteButton = ({ endpoint, id, setState, index = null }) => {
  async function handleDelete() {
    await Api.delete(endpoint, id);
    setState((cur) => {
      if (!(cur instanceof Date)) {
        const newArr = [...cur];
        newArr.splice(index, 1);
        return newArr;
      }

      setState(new Date());
    });
  }

  return (
    <Button size="sm" variant="outline-danger" onClick={handleDelete}>
      삭제
    </Button>
  );
};
