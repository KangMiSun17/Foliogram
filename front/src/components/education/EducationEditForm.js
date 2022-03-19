import { useEffect, useState } from "react";
import { Row, Button, Col, Form, FormCheck } from "react-bootstrap";
import * as Api from "../../api";

/**
 * @param {Object} val - eduList 배열 안에 있는 각각의 객체, 예시:{ school: "서울대학교", major: "컴퓨터", position: "박사졸업" }
 * @param {function} setEduList - eduList 상태를 바꿀 수 있는 함수(사용자의 학력 정보를 추가, 변경, 삭제를 eduList 상태값을 변경하여 바꾸는데 그때 사용)
 * @param {Boolean} setIsEditing - 편집 가능한지 여부(여기선 편집이 완료된 후 카드페이지로 다시 가기 위해props로 가져옴 (편집 완료 후 false값으로 바꾸어야 카드 페이지로 리렌더링됨)
 * @returns (\<Educations key={index} val={val} eduList={eduList} setEduList={setEduList} isEditable={isEditable} />)
 */
function EducationEditForm({
  val,
  // eduList,
  setEduList,
  setIsEditing,
  portfolioOwnerId,
}) {
  /**
   * @param {String} school - 학교 정보(초기값은 val객체 안에 school값으로 설정 되어있음)
   * @param {function} setSchool - school 상태를 바꿀 수 있는 함수(해당 기능을 통해 수정된 학교 정보를 가져와 상태를 변경할 수 있음 )
   */
  const [school, setSchool] = useState(val.school);
  /**
   * @param {String} major - 학과 정보(초기값은 val객체 안에 major값으로 설정 되어있음)
   * @param {function} setMajor - major 상태를 바꿀 수 있는 함수(해당 기능을 통해 수정된 학과 정보를 가져와 상태를 변경할 수 있음 )
   */
  const [major, setMajor] = useState(val.major);
  /**
   * @param {String} position - 졸업 여부(초기값은 val객체 안에 position값으로 설정 되어있음)
   * @param {function} setPosition - position 상태를 바꿀 수 있는 함수(해당 기능을 통해 수정된 졸업 여부를 가져와 상태를 변경할 수 있음 )
   */
  const [position, setPosition] = useState(val.position);
  /**
   * update로 서버에게 수정 요청 후 리렌더링
   * @param {Object} e - 이벤트 객체
   * @returns {void} 따로 리턴값이 없음
   */
  async function handleSubmit(e) {
    e.preventDefault();
    // 변경사항을 업데이트 하는 과정(map을 돌려 변경하고자 하는 school의 값과 같은 객체를 newEdu로 변경하여 setEduList의 인자로 넘겨주는 것을 통해 update기능 구현)

    await Api.put(`educations/${val.id}`, {
      school,
      major,
      position,
    });
    const res = await Api.get("educationlist", portfolioOwnerId);
    setEduList(res.data);
    // const newEduList = eduList.map((elem) => {
    //   if (elem.school === val.school) {
    //     const newEdu = { school, major, position };
    //     return newEdu;
    //   } else {
    //     return elem;
    //   }
    // });
    // setEduList(newEduList);
    setIsEditing(false);
  }
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

        <Form.Group as={Row} className="mt-3 mb-3 text-center">
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
