import React from "react";
import { Button } from "react-bootstrap";

/**
 * @param {function} submitHandler ConfirmButton onClick handler
 * @param {function} setState Change state when CancleButton onClick
 * @returns {component} Confirm Button and Cancle Button
 */
export const BundleButton = ({ submitHandler, setState }) => {
  return (
    <div className="mt-3 mb-4 text-center row">
      <div className="col-sm-20">
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
      </div>
    </div>
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
 * @param {function} handleDelete Delete request when deleteButton onClick
 * @returns {component} DeleteButton
 */
export const DeleteButton = ({ handleDelete }) => {
  return (
    <Button size="sm" variant="outline-danger" onClick={handleDelete}>
      삭제
    </Button>
  );
};
