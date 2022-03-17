import { useState } from "react";
import { Row, Button, Col, Form, FormCheck } from "react-bootstrap";

/**
 * @param {Object} val - eduList 배열 안에 있는 각각의 객체, 예시:{ school: "서울대학교", major: "컴퓨터", position: "박사졸업" }
 * @param {Array} eduList - 학력 정보 리스트
 * @param {function} setEduList - eduList 상태를 바꿀 수 있는 함수(사용자의 학력 정보를 추가, 변경, 삭제를 eduList 상태값을 변경하여 바꾸는데 그때 사용)
 * @param {Boolean} setIsEditing - 편집 가능한지 여부(여기선 편집이 완료된 후 카드페이지로 다시 가기 위해props로 가져옴 (편집 완료 후 false값으로 바꾸어야 카드 페이지로 리렌더링됨)
 * @returns ( <Educations key={index} val={val} eduList={eduList} setEduList={setEduList} isEditable={isEditable} />)
 */
function EducationEditForm({ val, eduList, setEduList, setIsEditing }) {
  const [school, setSchool] = useState(val.school);
  const [major, setMajor] = useState(val.major);
  const [position, setPosition] = useState(val.position);

  function handleSubmit(e) {
    e.preventDefault();

    const newEduList = eduList.map((elem) => {
      if (elem.school === val.school) {
        const newEdu = { school, major, position };
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
