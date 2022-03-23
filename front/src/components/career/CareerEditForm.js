import React, { useState, useContext } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { BundleButton } from "../common/Button";
import { DatePickForm, toStringDate, toObjectDate } from "../common/DateUtil";
import { CareerContext, CareerFetchContext } from "../common/context/Context";
import * as Api from "../../api";

/** 선택된 Project 편집하는 컴포넌트입니다.
 * @param {boolean} setIsEditing - 편집중 유무 변화시키는 state
 * @returns {component} - ProjectEditForm
 */
function CareerEditForm({ setIsEditing }) {
  const { setReFetching } = useContext(CareerFetchContext);
  const { id, title, description, from_date, to_date } =
    useContext(CareerContext);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [startDate, setStartDate] = useState(toObjectDate(from_date));
  const [endDate, setEndDate] = useState(toObjectDate(to_date));

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    //편집된 projects 업데이트 하기위해 서버로 put 요청
    try {
      await Api.put(`career/${id}`, {
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

      <Form.Group className="mt-3">
        <Row>
          <Col xs={3}>
            <DatePickForm startDate={startDate} setState={setStartDate} />
          </Col>
          <Col xs={3}>
            <DatePickForm startDate={endDate} setState={setEndDate} />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Row className="justify-content-center" xs="auto">
          <BundleButton submitHandler={handleSubmit} setState={setIsEditing} />
        </Row>
      </Form.Group>
    </Form>
  );
}

export default CareerEditForm;
