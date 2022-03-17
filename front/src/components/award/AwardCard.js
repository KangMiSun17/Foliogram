import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import AwardDelete from "./AwardDelete";

/** 수상 이력 목록 컴포넌트입니다.
 *
 * @param {boolean} setIsEditing - 편집중 상태 변경 state
 * @param {boolean} isEditable - 편집 가능 여부
 * @param {object} award - award.map으로 넘어온 각각의 award
 * @returns awardList and edit button
 */
function AwardCard({ setIsEditing, isEditable, award, setLastCall }) {
  return (
    <Row className="align-items-center">
      <Col className="mb-3">
        <span>{award.title}</span>
        <br />
        <span style={{ color: "gray" }}>{award.description}</span>
      </Col>
      {isEditable && (
        <>
          <Col sm={1}>
            <Button
              variant="outline-primary"
              onClick={(e) => setIsEditing(true)}
            >
              편집
            </Button>
          </Col>
          <Col sm={1}>
            <AwardDelete award={award} setLastCall={setLastCall} />
          </Col>
        </>
      )}
    </Row>
  );
}

export default AwardCard;
