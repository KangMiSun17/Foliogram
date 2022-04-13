import React, { useState } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { BundleButton } from "../common/Button";
import { toStringDate, toObjectDate } from "../common/DateUtil";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

/** 선택된 career 편집하는 컴포넌트입니다.
 * @param {boolean} setIsEditing - 편집중 유무 변화시키는 state
 * @returns {component} - CareerEditForm
 */
function CareerEditForm({ career, setCareerList, setIsEditing }) {
  const { id, title, description, from_date, to_date } = career.data;
  const [edit, setEdit] = useState({
    title,
    description,
    from_date: toObjectDate(from_date),
    to_date: toObjectDate(to_date),
  });
  const notSubAble = edit.title.length === 0 || edit.description.length === 0;

  //확인 버튼 누를 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    //편집된 career 업데이트 하기위해 서버로 put 요청
    try {
      const res = await Api.put(`careers/${id}`, {
        title: edit.title,
        description: edit.description,
        from_date: toStringDate(edit.from_date),
        to_date: toStringDate(edit.to_date),
      });

      setCareerList((cur) => {
        cur[career.index] = res.data;
        return [...cur];
      });
    } catch (err) {
      console.log(err);
    }

    setIsEditing(false);
  };

  return (
    <Form>
      <Form.Label>수정할 내용</Form.Label>
      <Form.Group className="mb-3" controlId="title">
        <Form.Control
          type="text"
          className="mb-3"
          value={edit.title}
          onChange={(e) =>
            setEdit((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Control
          type="text"
          className="mb-3"
          value={edit.description}
          onChange={(e) =>
            setEdit((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />
      </Form.Group>

      <Form.Group className="mt-3 mb-3">
        <Row>
          <Col xs={3}>
            <DatePicker
              className="mb-3"
              selected={edit.from_date}
              onChange={(date) =>
                setEdit((prev) => ({ ...prev, from_date: date }))
              }
            />
          </Col>
          <Col xs={3}>
            <DatePicker
              className="mb-3"
              selected={edit.to_date}
              onChange={(date) =>
                setEdit((prev) => ({ ...prev, to_date: date }))
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
