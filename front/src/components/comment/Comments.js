import React from "react";
import { Card, Button, Form } from "react-bootstrap";

function Comments() {
  const addComment = () => {};
  return (
    <Card>
      <Card.Header as="h5">댓글</Card.Header>
      <Card.Body>
        <Card.Title>댓글 목록</Card.Title>
        <Card className="mb-3">
          <Card.Text className="ms-2 mt-2 mb-2">
            <span>임꺽정님</span>
            <br />
            <span style={{ color: "gray" }}>너무 멋져요!</span>
          </Card.Text>
        </Card>
        <Card className="mb-3">
          <Card.Text className="ms-2 mt-2 mb-2">
            <span>임안꺽정님</span>
            <br />
            <span style={{ color: "gray" }}>너무 구려요!</span>
          </Card.Text>
        </Card>
        <Form.Control
          as="textarea"
          placeholder="댓글을 입력해주세요"
          style={{ height: "100px", marginBottom: "5px" }}
        />
        <Button variant="primary" onClick={addComment}>
          등록하기
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Comments;
