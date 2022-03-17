import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import * as Api from "../../api";

/** 수상 이력 편집 컴포넌트입니다.
 *
 * @param {boolean} setIsEditing - 편집중 상태 변경
 * @param {object} award -  편집 할 수상 이력
 * @param {function} editHandler - 확인 버튼 누를 시 상 추가 되는 함수
 * @param {number} id - 편집 할 수상 id
 * @returns editForm
 */
function AwardEditForm({ setIsEditing, award, setLastCall }) {
  const [editTitle, setEditTitle] = useState(award.title);
  const [editContent, setEditContent] = useState(award.description);

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(award);
    //awards 업데이트 하기위해 addHandler로 데이터 넘겨줌
    const res = await Api.put(`awards/${award.id}`, {
      title: editTitle,
      description: editContent,
    });
    console.log(res.data);
    setLastCall((cur) => cur + 1);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>수정할 내용</Form.Label>
        <Form.Control
          type="text"
          className="mb-3"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <Form.Control
          type="text"
          className="mb-3"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        <Row className="justify-content-center" xs="auto">
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
