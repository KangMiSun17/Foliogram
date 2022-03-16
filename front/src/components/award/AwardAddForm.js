import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";

/**
 * 수상 이력 추가 컴포넌트입니다.
 *
 * @param {boolean} isEditable - 편집 가능 여부
 *
 */
function AwardAddForm({ submitHandler, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [addName, setAddName] = useState("");
  const [addContent, setAddContent] = useState("");

  const startEditing = () => {
    setIsEditing((cur) => !cur);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing((cur) => !cur);
    submitHandler({ name: addName, content: addContent, id: id });
    setAddName("");
    setAddContent("");
  };

  return (
    <>
      {!isEditing ? (
        <Row className="justify-content-md-center" xs="auto">
          <Button onClick={startEditing}>+</Button>
        </Row>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="수상 내역"
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="상세 내역"
              value={addContent}
              onChange={(e) => setAddContent(e.target.value)}
            />
          </Form.Group>
          <Row className="justify-content-md-center" xs="auto">
            <Button type="submit" className="me-3">
              확인
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </Row>
        </Form>
      )}
    </>
  );
}

export default AwardAddForm;
