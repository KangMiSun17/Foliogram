import React, { useState, useContext } from "react";
import { Form, FormCheck, Row } from "react-bootstrap";
import { BundleButton } from "../common/Button";
import {
  EducationContext,
  EducationFetchContext,
} from "../common/context/Context";
import * as Api from "../../api";

/** 선택된 Education을 편집하는 컴포넌트입니다.
 * @param {boolean} setIsEditing - 편집중 유무 변화시키는 state
 * @returns {component} - EducationEditForm
 */
function EducationEditForm({ setIsEditing }) {
  const { setReFetching } = useContext(EducationFetchContext);
  const { id, school, major, position } = useContext(EducationContext);
  const [editSchool, setEditSchool] = useState(school);
  const [editMajor, setEditMajor] = useState(major);
  const [editPosition, setEditPosition] = useState(position);

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    //편집된 education 업데이트 하기위해 서버로 put 요청
    try {
      await Api.put(`educations/${id}`, {
        school: editSchool,
        major: editMajor,
        position: editPosition,
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
          value={editSchool}
          onChange={(e) => setEditSchool(e.target.value)}
        />
        <Form.Control
          type="text"
          className="mb-3"
          value={editMajor}
          onChange={(e) => setEditMajor(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-3">
        <FormCheck
          inline
          label="재학중"
          id="radio1"
          type="radio"
          name="position"
          value="재학중"
          checked={editPosition === "재학중"}
          onChange={(e) => setEditPosition(e.target.value)}
        ></FormCheck>
        <FormCheck
          inline
          label="학사졸업"
          id="radio2"
          type="radio"
          name="position"
          value="학사졸업"
          checked={editPosition === "학사졸업"}
          onChange={(e) => setEditPosition(e.target.value)}
        ></FormCheck>
        <FormCheck
          inline
          label="석사졸업"
          id="radio3"
          type="radio"
          name="position"
          value="석사졸업"
          checked={editPosition === "석사졸업"}
          onChange={(e) => setEditPosition(e.target.value)}
        ></FormCheck>
        <FormCheck
          inline
          label="박사졸업"
          id="radio4"
          type="radio"
          name="position"
          value="박사졸업"
          checked={editPosition === "박사졸업"}
          onChange={(e) => setEditPosition(e.target.value)}
        ></FormCheck>
      </Form.Group>

      <Form.Group>
        <Row className="justify-content-center" xs="auto">
          <BundleButton submitHandler={handleSubmit} setState={setIsEditing} />
        </Row>
      </Form.Group>
    </Form>
  );
}

export default EducationEditForm;
