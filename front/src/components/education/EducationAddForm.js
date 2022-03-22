import React, { useState, useContext } from "react";
import { Form, FormCheck, Row } from "react-bootstrap";
import { BundleButton, PlusButton } from "../common/Button";
import { OwnerContext, EducationFetchContext } from "../common/context/Context";
import * as Api from "../../api";

/** 학력을 추가하는 컴포넌트입니다.
 *
 * @returns {component} EducationAddForm
 */
function EducationAddForm() {
  const { portfolioOwnerId } = useContext(OwnerContext);
  const { setReFetching } = useContext(EducationFetchContext);
  const [addSchool, setAddSchool] = useState("");
  const [addMajor, setAddMajor] = useState("");
  const [addPosition, setAddPosition] = useState("재학중");
  const [isAdding, setIsAdding] = useState(false);

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();

    //추가된 Education 업데이트 하기위해 서버에 post 요청
    try {
      await Api.post(`education/create`, {
        user_id: portfolioOwnerId,
        school: addSchool,
        major: addMajor,
        position: addPosition,
      });

      setAddSchool("");
      setAddMajor("");
      setAddPosition("재학중");
    } catch (err) {
      console.log(err);
    }

    setReFetching(new Date());
    setIsAdding(false);
  };

  return (
    <>
      {!isAdding ? (
        <Row className="justify-content-center" xs="auto">
          <PlusButton setState={setIsAdding} />
        </Row>
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="학교 이름"
              value={addSchool}
              onChange={(e) => setAddSchool(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="전공"
              value={addMajor}
              onChange={(e) => setAddMajor(e.target.value)}
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
              checked={addPosition === "재학중"}
              onChange={(e) => setAddPosition(e.target.value)}
            ></FormCheck>
            <FormCheck
              inline
              label="학사졸업"
              id="radio2"
              type="radio"
              name="position"
              value="학사졸업"
              checked={addPosition === "학사졸업"}
              onChange={(e) => setAddPosition(e.target.value)}
            ></FormCheck>
            <FormCheck
              inline
              label="석사졸업"
              id="radio3"
              type="radio"
              name="position"
              value="석사졸업"
              checked={addPosition === "석사졸업"}
              onChange={(e) => setAddPosition(e.target.value)}
            ></FormCheck>
            <FormCheck
              inline
              label="박사졸업"
              id="radio4"
              type="radio"
              name="position"
              value="박사졸업"
              checked={addPosition === "박사졸업"}
              onChange={(e) => setAddPosition(e.target.value)}
            ></FormCheck>
          </Form.Group>

          <Row className="justify-content-center" xs="auto">
            <BundleButton submitHandler={handleSubmit} setState={setIsAdding} />
          </Row>
        </Form>
      )}
    </>
  );
}

export default EducationAddForm;
