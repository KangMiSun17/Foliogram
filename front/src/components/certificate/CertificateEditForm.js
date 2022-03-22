import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BundleButton } from "../common/Button";
import { toStringDate, toObjectDate } from "../common/DateUtil";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

/**
 * This component can edit certification item
 * @param {Object} props
 * @param {function} props.setCertificateList function to change the state of a list of certificates
 * @param {function} props.setIsEdit This State is select show edit screen or not show edit screen
 * @param {object} props.certificate Item in the Certification List
 * @param {number} props.index Index in the Certification List
 * @returns {component} Certificate edit Form
 */
function CertificateEditForm({
  setCertificateList,
  setIsEdit,
  certificate,
  index,
}) {
  const { id, title, description, when_date } = certificate;
  const [edit, setEdit] = useState({
    title,
    description,
    when_date: toObjectDate(when_date),
  });

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
        cur[index] = res.data;
        const newCertificateList = [...cur];
        return newCertificateList;
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
        selected={edit.when_date}
        onChange={(date) => setEdit((prev) => ({ ...prev, when_date: date }))}
      />
      <BundleButton submitHandler={handleEditSubmit} setState={setIsEdit} />
    </Form>
  );
}

export default CertificateEditForm;
