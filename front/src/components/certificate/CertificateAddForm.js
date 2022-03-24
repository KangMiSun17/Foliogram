import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { BundleButton } from "../common/Button";
import { toStringDate } from "../common/DateUtil";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

/**
 * This component can add certification item
 * @param {Object} props
 * @param {function} props.setIsAdding This State is select show add screen or not show add screen
 * @returns {component} Certificate add Form
 */
function CertificateAddForm({ setCertificateList, setIsAdding }) {
  const { user } = useContext(UserStateContext);
  const [add, setAdd] = useState({
    title: "",
    description: "",
    when_date: new Date(),
  });

  // Request certificate item add api
  const handleAddSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await Api.post("certificate/create", {
        user_id: user.id,
        title: add.title,
        description: add.description,
        when_date: toStringDate(add.when_date),
      });

      setCertificateList((cur) => [...cur, res.data]);
    } catch (err) {
      console.log("Error: certificates/create post request fail", err);
    }

    setIsAdding(false);
  };

  return (
    <Form className="mt-4">
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
        selected={add.when_date}
        onChange={(date) => setAdd((prev) => ({ ...prev, when_date: date }))}
      />
      <BundleButton submitHandler={handleAddSubmit} setState={setIsAdding} />
    </Form>
  );
}

export default CertificateAddForm;
