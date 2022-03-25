import React, { useState, useContext } from "react";
import { Form, Row, Alert } from "react-bootstrap";
import { BundleButton } from "../common/Button";
import {
  TechStackContext,
  TechStackFetchContext,
} from "../common/context/Context";
import * as Api from "../../api";

/** 선택된 Project 편집하는 컴포넌트입니다.
 * @param {boolean} setIsEditing - 편집중 유무 변화시키는 state
 * @returns {component} - ProjectEditForm
 */
function ProjectEditForm({ setIsEditing }) {
  const { setReFetching } = useContext(TechStackFetchContext);
  const { id, title, description } = useContext(TechStackContext);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const notSubAble = editTitle.length === 0 || editDescription.length === 0;

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    //편집된 projects 업데이트 하기위해 서버로 put 요청
    try {
      await Api.put(`techstacks/${id}`, {
        title: editTitle,
      });
    } catch (err) {
      console.log(err);
    }

    setReFetching(new Date());
    setIsEditing(false);
  };

  return (
    <Form>
      <Form.Group className="mb-3">
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
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
      </Form.Group>
      {notSubAble ? (
        <Alert variant="danger">
          <p>내용을 입력해주세요.</p>
        </Alert>
      ) : null}
      <Form.Group>
        <Row className="justify-content-center" xs="auto">
          <BundleButton
            disabled={notSubAble}
            submitHandler={handleSubmit}
            setState={setIsEditing}
          />
        </Row>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
