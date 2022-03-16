import React, { useState } from "react";
import { Button, Form, FormCheck, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Educations from "./Educations";

function EducationAddForm({ eduList, setEduList, setShowAddForm }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("재학중");

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
