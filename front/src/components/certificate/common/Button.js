import React from "react";
import { Button } from "react-bootstrap";

/**
 * @param {function} submitHandler
 * @param {function} setState
 * @returns {component} Confirm Button and Cancle Button
 */
export const BundleButton = (submitHandler, setState) => {
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
