import React, { useState } from "react";
import { Alert, Form, FormCheck, Row } from "react-bootstrap";
import { BundleButton } from "../../common/Button";
import * as Api from "../../../api";

/** 선택된 Education을 편집하는 컴포넌트입니다.
 * @param {boolean} setIsEditing - 편집중 유무 변화시키는 state
 * @returns {component} - EducationEditForm
 */
function EducationEditForm({ setIsEditing, education, setEducationList }) {
  const { id, school, major, position } = education.data;
  const [edit, setEdit] = useState({
    school,
    major,
    position,
  });
  const notSubAble = edit.school.length === 0 || edit.major.length === 0;

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    //편집된 education 업데이트 하기위해 서버로 put 요청
    try {
      const res = await Api.put(`educations/${id}`, {
        school: edit.school,
        major: edit.major,
        position: edit.position,
      });

      setEducationList((cur) => {
        cur[education.index] = res.data;
        return [...cur];
      });
    } catch (err) {
      console.log(err);
    }

    setIsEditing(false);
  };

  const radioList = ["재학중", "졸업", "학사졸업", "석사졸업", "박사졸업"];

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>수정할 내용</Form.Label>
        <Form.Control
          type="text"
          name="school"
          className="mb-3"
          value={edit.school}
          onChange={(e) =>
            setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
        <Form.Control
          type="text"
          name="major"
          className="mb-3"
          value={edit.major}
          onChange={(e) =>
            setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
      </Form.Group>

      <Form.Group className="mt-3 mb-3">
        {radioList.map((graduate, index) => {
          return (
            <FormCheck
              inline
              label={graduate}
              key={index}
              id={index}
              type="radio"
              name="position"
              value={graduate}
              checked={edit.position === graduate}
              onChange={(e) =>
                setEdit((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            ></FormCheck>
          );
        })}
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

export default EducationEditForm;
