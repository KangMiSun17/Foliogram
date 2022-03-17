import React, { useState } from "react";
import { Button, Form, FormCheck, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Educations from "./Educations";

/**
 * @param {Array} eduList - 학력 정보 리스트
 * @param {function} setEduList - eduList 상태를 바꿀 수 있는 함수(사용자의 학력 정보를 추가, 변경, 삭제를 eduList 상태값을 변경하여 바꾸는데 그때 사용)
 * @param {Boolean} setShowAddForm - 글 추가 컴포넌트 토글 기능(취소 버튼을 누르거나 확인 버튼을 누른 후 false로 상태를 변경하여 글을 기입한 후 원래대로 돌아가게 하는 기능을 구현하는데 사용 )
 * @returns (\<EducationAddForm eduList={eduList} setEduList={setEduList} setShowAddFor{setShowAddForm}></EducationAddForm>)
 */
function EducationAddForm({ eduList, setEduList, setShowAddForm }) {
  /**
   * @param {String} school - 학교 정보(초기값은 빈 문자열)
   * @param {function} setSchool - school 상태를 바꿀 수 있는 함수(해당 기능을 통해 새로운 학교 정보를 가져와 상태를 변경할 수 있음 )
   */
  const [school, setSchool] = useState("");
  /**
   * @param {String} major - 학과 정보(초기값은 빈 문자열)
   * @param {function} setMajor - major 상태를 바꿀 수 있는 함수(해당 기능을 통해 새로운 학과 정보를 가져와 상태를 변경할 수 있음 )
   */
  const [major, setMajor] = useState("");
  /**
   * @param {String} position - 졸업 여부(초기값은 "재학중")
   * @param {function} setPosition - position 상태를 바꿀 수 있는 함수(해당 기능을 통해 졸업 여부 정보를 가져와 상태를 변경할 수 있음 )
   */
  const [position, setPosition] = useState("재학중");
  /**
   * 아래 form이 제출되면 해당 함수로 와서 새로 추가된 정보를 setEduList에 넘겨주어 EduList를 새로 업데이트를함(api연결할 땐 사용하지 않음)
   * @param {Object} e - 이벤트 객체
   * @returns {void} 따로 리턴값이 없음
   */
  function handleSubmit(e) {
    e.preventDefault();

    const newEdu = { school, major, position };
    const createNewEduList = [...eduList, newEdu];
    setEduList(createNewEduList);
    setShowAddForm(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="EudEditTitle" className="mb-3">
        <Form.Control
          type="text"
          placeholder="학교"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="EduEditDesc" className="mb-3">
        <Form.Control
          type="text"
          placeholder="학과"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <FormCheck
          inline
          label="재학중"
          id="radio1"
          type="radio"
          name="position"
          value="재학중"
          checked={position === "재학중"}
          onChange={(e) => setPosition(e.target.value)}
        ></FormCheck>
        <FormCheck
          inline
          label="학사졸업"
          id="radio2"
          type="radio"
          name="position"
          value="학사졸업"
          checked={position === "학사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        ></FormCheck>
        <FormCheck
          inline
          label="석사졸업"
          id="radio3"
          type="radio"
          name="position"
          value="석사졸업"
          checked={position === "석사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        ></FormCheck>
        <FormCheck
          inline
          label="박사졸업"
          id="radio4"
          type="radio"
          name="position"
          value="박사졸업"
          checked={position === "박사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        ></FormCheck>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setShowAddForm(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;
