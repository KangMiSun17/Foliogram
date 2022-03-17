import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
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
    <Container>
      <Row className="mb-3">
        <Col>
          <span>{award.title}</span>
          <br />
          <span style={{ color: "gray" }}>{award.description}</span>
        </Col>
        {isEditable && (
          <Col xs={2}>
            <Button
              variant="outline-primary"
              onClick={(e) => setIsEditing(true)}
              className="me-2"
            >
              편집
            </Button>
            <AwardDelete award={award} setLastCall={setLastCall} />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default AwardCard;
