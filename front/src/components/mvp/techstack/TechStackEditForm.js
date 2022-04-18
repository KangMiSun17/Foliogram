import React, { useState } from "react";
import { Form, Row, Alert } from "react-bootstrap";
import { BundleButton } from "../../common/Button";
import * as Api from "../../../api";

/** 선택된 Tech stack 편집하는 컴포넌트입니다.
 * @param {boolean} setIsEditing - 편집중 유무 변화시키는 state
 * @returns {component} - ProjectEditForm
 */
function ProjectEditForm({ setIsEditing, techStack, setTechStackList }) {
  const { id, title, description } = techStack.data;
  const [edit, setEdit] = useState({
    title,
    description,
  });
  const notSubAble = edit.title.length === 0 || edit.description.length === 0;

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    //편집된 tech stack 업데이트 하기위해 서버로 put 요청
    try {
      const res = await Api.put(`techstacks/${id}`, {
        title: edit.title,
        description: edit.description,
      });

      setTechStackList((cur) => {
        cur[techStack.index] = res.data;
        return [...cur];
      });
    } catch (err) {
      console.log(err);
    }

    setIsEditing(false);
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>수정할 내용</Form.Label>
        <Form.Control
          type="text"
          className="mb-3"
          name="title"
          value={edit.title}
          onChange={(e) =>
            setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
        <Form.Control
          type="text"
          className="mb-3"
          name="description"
          value={edit.description}
          onChange={(e) =>
            setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
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
