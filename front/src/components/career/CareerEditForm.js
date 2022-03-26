import React, { useState, useContext } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { BundleButton } from "../common/Button";
import { DatePickForm, toStringDate, toObjectDate } from "../common/DateUtil";
import { CareerContext, CareerFetchContext } from "../common/context/Context";
import * as Api from "../../api";

/** 선택된 career 편집하는 컴포넌트입니다.
 * @param {boolean} setIsEditing - 편집중 유무 변화시키는 state
 * @returns {component} - CareerEditForm
 */
function CareerEditForm({ setIsEditing }) {
  const { setReFetching } = useContext(CareerFetchContext);
  const { id, title, description, from_date, to_date } =
    useContext(CareerContext);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [startDate, setStartDate] = useState(toObjectDate(from_date));
  const [endDate, setEndDate] = useState(toObjectDate(to_date));
  const notSubAble = editTitle.length === 0 || editDescription.length === 0;

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    //편집된 career 업데이트 하기위해 서버로 put 요청
    try {
      await Api.put(`careers/${id}`, {
        title: editTitle,
        description: editDescription,
        from_date: toStringDate(startDate),
        to_date: toStringDate(endDate),
      });
    } catch (err) {
      console.log(err);
    }

    setReFetching(new Date());
    setIsEditing(false);
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>수정할 내용</Form.Label>
        <Form.Control
          type="text"
          className="mb-3"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <Form.Control
          type="text"
          className="mb-3"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-3 mb-3">
        <Row>
          <Col xs={3}>
            <DatePickForm startDate={startDate} setState={setStartDate} />
          </Col>
          <Col xs={3}>
            <DatePickForm startDate={endDate} setState={setEndDate} />
          </Col>
        </Row>
      </Form.Group>
      {notSubAble ? (
        <Alert variant="danger">
          <p>내용을 입력해주세요.</p>
        </Alert>
      ) : null}
      <Form.Group>
        <Row className="justify-content-center" xs="auto">
          <BundleButton
            disabled={notSubAble}
            submitHandler={handleSubmit}
            setState={setIsEditing}
          />
        </Row>
      </Form.Group>
    </Form>
  );
}

export default CareerEditForm;
