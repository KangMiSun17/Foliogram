import React, { useState, useEffect } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";

/**
 * 수상 이력 목록 컴포넌트입니다.
 *
 * @param {boolean} setIsEditing - 편집중 상태 변경 state
 * @param {boolean} isEditable - 편집 가능 여부
 * @param {object} award - award.map으로 넘어온 각각의 award
 *
 */
function AwardCard({ setIsEditing, isEditable, award }) {
  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <span>{award.name}</span>
          <br />
          <span style={{ color: "gray" }}>{award.content}</span>
        </Col>
        {isEditable && (
          <Col xs={2}>
            <Button
              variant="outline-primary"
              onClick={(e) => setIsEditing(true)}
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default AwardCard;
