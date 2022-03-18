import React from "react";
import { Button } from "react-bootstrap";
import * as Api from "../../api";

/** 수상 이력 삭제 컴포넌트입니다.
 *
 * @param {object} award - award.map으로 넘어온 각각의 award
 * @param {state} setLastCall - 렌더링 하기 위한 state
 * @returns awardList and edit button
 */
function AwardDelete({ award, setLastCall }) {
  //삭제된 awards 업데이트 하기위해 delete 요청
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
