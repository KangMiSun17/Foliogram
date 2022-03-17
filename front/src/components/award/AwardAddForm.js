import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import * as Api from "../../api";

/** 수상 이력 추가 컴포넌트입니다.
 *
 * @param {function} addHandler - 확인 버튼 누를 시 상 추가 되는 함수
 * @param {number} id - 새롭게 추가 되는 상의 아이디
 * @returns addForm
 */
function AwardAddForm({ portfolioOwnerId, setLastCall }) {
  const [isEditing, setIsEditing] = useState(false); //편집중인지 아닌지
  const [addTitle, setAddTitle] = useState(""); //추가된 상 이름
  const [addDescription, setAddDescription] = useState(""); //추가된 상 내용

  const startEditing = () => {
    setIsEditing((cur) => !cur);
  };

  //확인 버튼 누를 시 수상 내역 추가
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing((cur) => !cur);
    //awards 업데이트 하기위해 addHandler로 데이터 넘겨줌
    const res = await Api.post(`award/create`, {
      user_id: portfolioOwnerId,
      title: addTitle,
      description: addDescription,
    });
    console.log(res.data);
    setAddTitle("");
    setAddDescription("");
    setLastCall((cur) => cur + 1);
  };

  return (
    <>
      {!isEditing ? (
        <Row className="justify-content-center" xs="auto">
          <Button onClick={startEditing}>+</Button>
        </Row>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="수상 내역"
              value={addTitle}
              onChange={(e) => setAddTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="상세 내역"
              value={addDescription}
              onChange={(e) => setAddDescription(e.target.value)}
            />
          </Form.Group>
          <Row className="justify-content-center" xs="auto">
            <Button type="submit" className="me-3">
              확인
            </Button>
            <Button variant="secondary" onClick={startEditing}>
              취소
            </Button>
          </Row>
        </Form>
      )}
    </>
  );
}

export default AwardAddForm;
