import React, { useState, useContext } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { BundleButton, PlusButton } from "../common/Button";
import { toStringDate } from "../common/DateUtil";
import { UserContext, ProjectFetchContext } from "../common/context/Context";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

/** 프로젝트 추가하는 컴포넌트입니다.
 *
 * @returns {component} ProjectAddForm
 */
function ProjectAddForm() {
  const { portfolioOwnerId } = useContext(UserContext);
  const { setReFetching } = useContext(ProjectFetchContext);
  const [isAdding, setIsAdding] = useState(false);
  const [add, setAdd] = useState({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();

    //추가된 projects 업데이트 하기위해 서버에 post 요청
    try {
      await Api.post(`project/create`, {
        user_id: portfolioOwnerId,
        title: add.title,
        description: add.description,
        from_date: toStringDate(add.startDate),
        to_date: toStringDate(add.endDate),
      });

      setAdd({
        title: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
      });
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
          <Form.Group className="mb-3" controlId="title">
            <Form.Control
              type="text"
              placeholder="프로젝트 제목"
              value={add.title}
              onChange={(e) =>
                setAdd((prev) => ({ ...prev, [e.target.id]: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Control
              type="text"
              placeholder="상세내역"
              value={add.description}
              onChange={(e) =>
                setAdd((prev) => ({ ...prev, [e.target.id]: e.target.value }))
              }
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Row>
              <Col xs={3}>
                <DatePicker
                  selected={add.startDate}
                  onChange={(date) =>
                    setAdd((prev) => ({ ...prev, startDate: date }))
                  }
                />
              </Col>
              <Col xs={3}>
                <DatePicker
                  selected={add.endDate}
                  onChange={(date) =>
                    setAdd((prev) => ({ ...prev, endDate: date }))
                  }
                />
              </Col>
            </Row>
          </Form.Group>

          <Row className="justify-content-center" xs="auto">
            <BundleButton submitHandler={handleSubmit} setState={setIsAdding} />
          </Row>
        </Form>
      )}
    </>
  );
}

export default ProjectAddForm;
