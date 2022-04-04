import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { BundleButton } from "../common/Button";
import { toStringDate, toObjectDate } from "../common/DateUtil";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

/**
 * This component can edit certification item
 * @param {Object} props
 * @param {function} props.setIsEdit This State is select show edit screen or not show edit screen
 * @param {object} props.certificate Item in the Certification List
 * @param {number} props.index Index in the Certification List
 * @returns {component} Certificate edit Form
 */
function CertificateEditForm({ setCertificateList, setIsEdit, certificate }) {
  const { id, title, description, when_date } = certificate.data;
  const [edit, setEdit] = useState({
    title,
    description,
    when_date: toObjectDate(when_date),
  });
  const notSubAble = edit.title.length === 0 || edit.description.length === 0;

  // Request certificate item modification api
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await Api.put("certificates/" + id, {
        title: edit.title,
        description: edit.description,
        when_date: toStringDate(edit.when_date),
      });

      setCertificateList((cur) => {
        cur[certificate.index] = res.data;
        return [...cur];
      });
    } catch (err) {
      console.log("Error: certificates put request fail", err);
    }

    setIsEdit(false);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="title">
        <Form.Control
          type="editTitle"
          value={edit.title}
          placeholder="자격증 제목"
          onChange={(e) =>
            setEdit((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Control
          type="editDescription"
          value={edit.description}
          placeholder="상세내역"
          onChange={(e) =>
            setEdit((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
        />
      </Form.Group>
      <DatePicker
        className="mb-3"
        selected={edit.when_date}
        onChange={(date) => setEdit((prev) => ({ ...prev, when_date: date }))}
      />
      {notSubAble ? (
        <Alert variant="danger">
          <p>내용을 입력해주세요.</p>
        </Alert>
      ) : null}
      <BundleButton
        disabled={notSubAble}
        submitHandler={handleEditSubmit}
        setState={setIsEdit}
      />
    </Form>
  );
}

export default CertificateEditForm;
