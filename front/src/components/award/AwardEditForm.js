import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";

//수상 이력 편집 컴포넌트입니다.
function AwardEditForm({ setIsEditing, award, editHandler, id }) {
  const [editName, setEditName] = useState(award.name);
  const [editContent, setEditContent] = useState(award.content);
  const thisId = id;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    editHandler(thisId, { name: editName, content: editContent, id: thisId });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>수정할 내용</Form.Label>
        <Form.Control
          type="text"
          className="mb-3"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <Form.Control
          type="text"
          className="mb-3"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        <Row className="justify-content-md-center" xs="auto">
          <Button type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
