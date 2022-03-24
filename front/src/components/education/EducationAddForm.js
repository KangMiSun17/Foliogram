import React, { useState, useContext } from "react";
import { Form, FormCheck, Row } from "react-bootstrap";
import { BundleButton, PlusButton } from "../common/Button";
import { UserContext, EducationFetchContext } from "../common/context/Context";
import * as Api from "../../api";
import { FormCheckField } from "../common/Form";

/** 학력을 추가하는 컴포넌트입니다.
 *
 * @returns {component} EducationAddForm
 */
function EducationAddForm() {
  const { portfolioOwnerId } = useContext(UserContext);
  const { setReFetching } = useContext(EducationFetchContext);
  const [add, setAdd] = useState({
    school: "",
    major: "",
    position: "재학중",
  });
  const [isAdding, setIsAdding] = useState(false);

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();

    //추가된 Education 업데이트 하기위해 서버에 post 요청
    try {
      await Api.post(`education/create`, {
        user_id: portfolioOwnerId,
        school: add.school,
        major: add.major,
        position: add.position,
      });

      setAdd({
        school: "",
        major: "",
        position: "재학중",
      });
    } catch (err) {
      console.log(err);
    }

    setReFetching(new Date());
    setIsAdding(false);
  };

  const radioList = ["재학중", "졸업", "학사졸업", "석사졸업", "박사졸업"];

  return (
    <>
      {!isAdding ? (
        <Row className="justify-content-center" xs="auto">
          <PlusButton setState={setIsAdding} />
        </Row>
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="school">
            <Form.Control
              type="text"
              placeholder="학교 이름"
              value={add.school}
              onChange={(e) =>
                setAdd((prev) => ({ ...prev, [e.target.id]: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="major">
            <Form.Control
              type="text"
              placeholder="전공"
              value={add.major}
              onChange={(e) =>
                setAdd((prev) => ({ ...prev, [e.target.id]: e.target.value }))
              }
            />
          </Form.Group>

          <Form.Group className="mt-3">
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
                  checked={add.position === graduate}
                  onChange={(e) =>
                    setAdd((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                ></FormCheck>
              );
            })}
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
