import { useState } from "react";
import { Row, Button, Col, Form, FormCheck } from "react-bootstrap";

function EducationEditForm({ val, eduList, setEduList, setIsEditing }) {
  const [title, setTitle] = useState(val.title);
  const [desc, setDesc] = useState(val.desc);
  const [position, setPosition] = useState(val.position);

  function handleSubmit(e) {
    e.preventDefault();

    const newEduList = eduList.map((elem) => {
      if (elem.title === val.title) {
        const newEdu = { title, desc, position };
        return newEdu;
      } else {
        return elem;
      }
    });
    setEduList(newEduList);
    setIsEditing(false);
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const res = await Api.put(`users/${user.id}`, {
  //     title,
  //     desc
  //   });

  //   const updateData = res.data
  //   setEduList(updateData)
  // };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="EudEditTitle" className="mb-3">
          <Form.Control
            type="text"
            placeholder="학교"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="EduEditDesc" className="mb-3">
          <Form.Control
            type="text"
            placeholder="학과"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}

export default EducationEditForm;
