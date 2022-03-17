import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { toStringDate } from "./common/DateUtil";
import { UserStateContext } from "../../App";
import { FecthContext } from "./common/Context";
import { BundleButton } from "./common/Button";
import * as Api from "../../api";

/**
 * @description This component that shows certificate adding screen if isAdding state === true
 * @param {Object} props
 * @param {function} props.setIsAdding - This State is select show add screen or not show add screen
 * @returns {component} Certificate add Form
 */
function CertificateAddForm({ setIsAdding }) {
  const userState = useContext(UserStateContext);
  const { setIsFetching } = useContext(FecthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  /**
   * Certificate data send - post request
   * @param {object} event Event object
   */
  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const data = {
      user_id: userState.user.id,
      title,
      description,
      when_date: toStringDate(startDate),
    };

    try {
      await Api.post("certificates/create", data);

      // Set state when success send request
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log("Error: certificates/create post request fail", err);
    }

    setIsFetching(new Date());
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
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      {BundleButton(handleAddSubmit, setIsAdding)}
    </Form>
  );
}

export default CertificateAddForm;
