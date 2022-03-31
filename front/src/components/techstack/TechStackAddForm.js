import React, { useState, useContext } from "react";
import { Form, Row, Alert } from "react-bootstrap";
import { BundleButton, PlusButton } from "../common/Button";

import { User1Context, TechStackFetchContext } from "../common/context/Context";
import * as Api from "../../api";

/** 기술스택 추가하는 컴포넌트입니다.
 *
 * @returns {component} TechStackAddForm
 */
function TechStackAddForm() {
  const { portfolioOwnerId } = useContext(User1Context);
  const { setReFetching } = useContext(TechStackFetchContext);
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const notSubAble = addTitle.length === 0 || addDescription.length === 0;
  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();

    //추가된 projects 업데이트 하기위해 서버에 post 요청
    try {
      await Api.post(`techstack/create`, {
        user_id: portfolioOwnerId,
        title: addTitle,
        description: addDescription,
      });

      setAddTitle("");
      setAddDescription("");
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
          <Form.Label>추가할 내용</Form.Label>
          <Form.Group className="mb-3" controlId="tech">
            <Form.Control
              type="text"
              placeholder="기술명"
              value={addTitle}
              onChange={(e) => setAddTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="details">
            <Form.Control
              type="text"
              placeholder="상세정보"
              value={addDescription}
              onChange={(e) => setAddDescription(e.target.value)}
            />
          </Form.Group>
          {notSubAble ? (
            <Alert variant="danger">
              <p>내용을 입력해주세요.</p>
            </Alert>
          ) : null}
          <Row className="justify-content-center" xs="auto">
            <BundleButton
              disabled={notSubAble}
              submitHandler={handleSubmit}
              setState={setIsAdding}
            />
          </Row>
        </Form>
      )}
    </>
  );
}

export default TechStackAddForm;
