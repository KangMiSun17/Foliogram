import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { DatePickForm } from "../common/DateUtil";
import { BundleButton } from "../common/Button";
import { toStringDate, toObjectDate } from "../common/DateUtil";
import { CertificateContext } from "../common/context/Context";
import * as Api from "../../api";

/**
 * This component can edit certification item
 * @param {Object} props
 * @param {function} props.setIsEdit This State is select show edit screen or not show edit screen
 * @param {object} props.certificate Item in the Certification List
 * @param {number} props.index Index in the Certification List
 * @returns {component} Certificate edit Form
 */
function CertificateEditForm({ setIsEdit, certificate, index }) {
  const { setCertificateList } = useContext(CertificateContext);
  const { id, title, description, when_date } = certificate;
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [startDate, setStartDate] = useState(toObjectDate(when_date));

  // Request certificate item modification api
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await Api.put("certificates/" + id, {
        title: editTitle,
        description: editDescription,
        when_date: toStringDate(startDate),
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
      <Form.Group className="mb-3" controlId="certificateEditName">
        <Form.Control
          type="editName"
          value={editTitle}
          placeholder="자격증 제목"
          onChange={(e) => setEditTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="certificateEditDescription">
        <Form.Control
          type="editDescription"
          value={editDescription}
          placeholder="상세내역"
          onChange={(e) => setEditDescription(e.target.value)}
        />
      </Form.Group>
      <DatePickForm startDate={startDate} setState={setStartDate} />
      <BundleButton submitHandler={handleEditSubmit} setState={setIsEdit} />
    </Form>
  );
}

export default CertificateEditForm;
