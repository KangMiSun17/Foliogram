import React, { useState, useEffect, Component } from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import Awards from "./Awards";
import * as Api from "../../api";

/** 수상 이력 카드 컴포넌트입니다.
 *
 * @param {boolean} isEditable - 편집 가능 여부
 * @returns Awards
 */
function Award({ portfolioOwnerId, isEditable }) {
  //수상 이력 객체
  const [awards, setAwards] = useState([]);
  const [lastCall, setLastCall] = useState(0);

  useEffect(() => {
    Api.get(`awardlist`, portfolioOwnerId).then((res) => setAwards(res.data));
    console.log(lastCall);
  }, [portfolioOwnerId, lastCall]);

  return (
    <Card className="me-4">
      <Card.Body>
        <Card.Title className="mb-3">수상 이력</Card.Title>
        <Card.Text>
          {awards.map((award) => (
            <Awards
              key={award.id}
              isEditable={isEditable}
              award={award}
              awards={awards}
              setAwards={setAwards}
            />
          ))}
        </Card.Text>
        {isEditable && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            awards={awards}
            setAwards={setAwards}
            setLastCall={setLastCall}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Award;
