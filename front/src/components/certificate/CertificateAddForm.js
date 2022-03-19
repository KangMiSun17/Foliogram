import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { BundleButton } from "../common/Button";
import { DatePickForm } from "../common/DateUtil";
import { toStringDate } from "../common/DateUtil";
import { UserStateContext } from "../../App";
import * as Api from "../../api";

/**
 * This component can add certification item
 * @param {Object} props
 * @param {function} props.setCertificateList function to change the state of a list of certificates
 * @param {function} props.setIsAdding This State is select show add screen or not show add screen
 * @returns {component} Certificate add Form
 */
function CertificateAddForm({ setCertificateList, setIsAdding }) {
  const { user } = useContext(UserStateContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  // Request certificate item add api
  const handleAddSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await Api.post("certificates/create", {
        user_id: user.id,
        title,
        description,
        when_date: toStringDate(startDate),
      });

      setCertificateList((cur) => {
        const newCertificateList = [...cur, res.data];
        return newCertificateList;
      });
    } catch (err) {
      console.log("Error: certificates/create post request fail", err);
    }

    setIsAdding(false);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="certificateAddName">
        <Form.Control
          type="addName"
          value={title}
          placeholder="자격증 제목"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="certificateAddDescription">
        <Form.Control
          type="addDescription"
          value={description}
          placeholder="상세내역"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <DatePickForm startDate={startDate} setState={setStartDate} />
      <BundleButton submitHandler={handleAddSubmit} setState={setIsAdding} />
    </Form>
  );
}

export default CertificateAddForm;
