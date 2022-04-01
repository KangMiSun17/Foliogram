import React, { useState, useContext } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { BundleButton, PlusButton } from "../common/Button";
import { toStringDate } from "../common/DateUtil";
import DatePicker from "react-datepicker";
import { OwnerContext, CareerFetchContext } from "../common/context/Context";
import * as Api from "../../api";

/** 경력 추가하는 컴포넌트입니다.
 *
 * @returns {component} ProjectAddForm
 */
function CareerAddForm() {
  const { portfolioOwnerId } = useContext(OwnerContext);
  const { setReFetching } = useContext(CareerFetchContext);
  const [add, setAdd] = useState({
    title: "",
    description: "",
    from_date: new Date(),
    to_date: new Date(),
  });
  const [isAdding, setIsAdding] = useState(false);
  const notSubAble = add.title.length === 0 || add.description.length === 0;

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();

    //추가된 career 업데이트 하기위해 서버에 post 요청
    try {
      await Api.post(`career/create`, {
        user_id: portfolioOwnerId,
        title: add.title,
        description: add.description,
        from_date: toStringDate(add.from_date),
        to_date: toStringDate(add.to_date),
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
              placeholder="근무지"
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

          <Form.Group className="mt-3 mb-3">
            <Row>
              <Col xs={3}>
                <DatePicker
                  className="mb-3"
                  selected={add.from_date}
                  onChange={(date) =>
                    setAdd((prev) => ({ ...prev, from_date: date }))
                  }
                />
              </Col>
              <Col xs={3}>
                <DatePicker
                  className="mb-3"
                  selected={add.to_date}
                  onChange={(date) =>
                    setAdd((prev) => ({ ...prev, to_date: date }))
                  }
                />
              </Col>
            </Row>
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

export default CareerAddForm;
