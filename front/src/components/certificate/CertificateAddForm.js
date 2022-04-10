import React, { useState, useContext } from "react";
import { Alert, Form, Row } from "react-bootstrap";
import { BundleButton, PlusButton } from "../common/Button";
import { toStringDate } from "../common/DateUtil";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import { UserContext } from "../common/context/UserContext";

/**
 * This component can add certification item
 * @param {Object} props
 * @param {function} props.setIsAdding This State is select show add screen or not show add screen
 * @returns {component} Certificate add Form
 */
function CertificateAddForm({ setCertificateList }) {
  const { userState } = useContext(UserContext);
  const init = {
    title: "",
    description: "",
    when_date: new Date(),
  };
  const [isAdding, setIsAdding] = useState(false);
  const [add, setAdd] = useState(init);
  const notSubAble = add.title.length === 0 || add.description.length === 0;

  // Request certificate item add api
  const handleAddSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await Api.post("certificate/create", {
        user_id: userState.user.id,
        title: add.title,
        description: add.description,
        when_date: toStringDate(add.when_date),
      });

      setCertificateList((cur) => [...cur, res.data]);
    } catch (err) {
      console.log("Error: certificates/create post request fail", err);
    }

    setAdd(init);
    setIsAdding(false);
  };

  return (
    <>
      {!isAdding ? (
        <Row className="justify-content-center" xs="auto">
          <PlusButton setState={setIsAdding} />
        </Row>
      ) : (
        <Form className="mt-4">
          <Form.Label>추가할 내용</Form.Label>
          <Form.Group className="mb-3" controlId="title">
            <Form.Control
              type="addTitle"
              value={add.title}
              placeholder="자격증 제목"
              onChange={(e) =>
                setAdd((prev) => ({ ...prev, [e.target.id]: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Control
              type="addDescription"
              value={add.description}
              placeholder="상세내역"
              onChange={(e) =>
                setAdd((prev) => ({ ...prev, [e.target.id]: e.target.value }))
              }
            />
          </Form.Group>
          <DatePicker
            className="mb-3"
            selected={add.when_date}
            onChange={(date) =>
              setAdd((prev) => ({ ...prev, when_date: date }))
            }
          />
          {notSubAble ? (
            <Alert variant="danger">
              <p>내용을 입력해주세요.</p>
            </Alert>
          ) : null}
          <BundleButton
            disabled={notSubAble}
            submitHandler={handleAddSubmit}
            setState={setIsAdding}
          />
        </Form>
      )}
    </>
  );
}

export default CertificateAddForm;
