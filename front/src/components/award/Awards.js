import React, { useState, useEffect, Component } from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import Award from "./Award";
import * as Api from "../../api";

/** 수상 이력 카드 컴포넌트입니다.
 *
 * @param {number} portfolioOwnerId - 포트폴리오 주인 아이디
 * @param {boolean} isEditable - 편집 가능 여부
 * @returns Award or AwardAddForm
 */
function Awards({ portfolioOwnerId, isEditable }) {
  //수상 이력 객체
  const [awards, setAwards] = useState([]);
  const [lastCall, setLastCall] = useState(0);

  useEffect(() => {
    Api.get(`awardlist`, portfolioOwnerId).then((res) => setAwards(res.data));
  }, [portfolioOwnerId, lastCall]);

  return (
    <Card className="me-4 mt-3">
      <Card.Body>
        <Card.Title className="mb-3">수상 이력</Card.Title>
        <Card.Body>
          {awards.map((award) => (
            <Award
              key={award.id}
              isEditable={isEditable}
              award={award}
              setLastCall={setLastCall}
            />
          ))}
        </Card.Body>
        {isEditable && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setLastCall={setLastCall}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Awards;
