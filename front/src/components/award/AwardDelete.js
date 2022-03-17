import React from "react";
import { Button } from "react-bootstrap";
import * as Api from "../../api";

function AwardDelete({ award, setLastCall }) {
  const Delete = async () => {
    await Api.delete(`awards/${award.id}`);
    setLastCall((cur) => cur + 1);
  };
  return (
    <Button variant="outline-danger" onClick={Delete}>
      삭제
    </Button>
  );
}

export default AwardDelete;
