import React, { useState, useEffect } from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import Awards from "./Awards";

/**
 * 수상 이력 카드 컴포넌트입니다.
 *
 * @param {boolean} isEditable - 편집 가능 여부
 *
 */
function Award({ isEditable }) {
  const [id, setId] = useState(2);

  //수상 이력 객체
  const [awards, setAwards] = useState([
    {
      name: "개근상",
      content: "18년 동안 개근함",
      id: 0,
    },
    {
      name: "상상",
      content: "상상력이 풍부함",
      id: 1,
    },
  ]);

  useEffect(() => {}, [awards]);

  /**
   * Awards add function
   *
   * @param {object} award - //AwardAddForm 에서 넘어온 추가된 award
   *
   */
  const addHandler = (award) => {
    const newAwards = [...awards, award];
    setAwards(newAwards);
    console.log(newAwards);
    setId((cur) => cur + 1);
  };

  /**
   * Awards add function
   *
   * @param {number} id - 편집된 award's id
   * @param {object} award - //AwardEditForm 에서 넘어온 편집된 award
   *
   */
  const editHandler = (id, award) => {
    const newAwards = [...awards];
    newAwards[id] = { ...award };
    setAwards(newAwards);
  };

  return (
    <Card className="me-4">
      <Card.Body>
        <Card.Title className="mb-3">수상 이력</Card.Title>
        <Card.Text>
          {awards.map((award) => (
            <Awards
              isEditable={isEditable}
              award={award}
              editHandler={editHandler}
              id={id}
            />
          ))}
        </Card.Text>
        {isEditable && (
          <AwardAddForm addHandler={addHandler} id={id} setId={setId} />
        )}
      </Card.Body>
    </Card>
  );
}

export default Award;
