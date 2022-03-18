import React, { useEffect, useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { DatePickForm } from "../common/DateUtil";
import { BundleButton } from "../common/Button";
import { CertificateFetchContext } from "../common/context/Context";
import { toStringDate, toObjectDate } from "../common/DateUtil";
import * as Api from "../../api";

/**
 * @description This component that shows certificate editing screen if isEditing state === true
 * @param {Object} props
 * @param {function} props.setIsEdit - This State is select show edit screen or not show edit screen
 * @returns {component} Certificate edit Form
 */
function CertificateEditForm({ certificate, setIsEdit }) {
  const { setReFetching } = useContext(CertificateFetchContext);
  const { id, title, description, when_date } = certificate;
  const [isCertificate, setIsCertificate] = useState([]);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [startDate, setStartDate] = useState(toObjectDate(when_date));

  // Get certificate data only one
  useEffect(() => {
    try {
      const getCertificate = async () => {
        const res = await Api.get("certificates", id);
        setIsCertificate(res.data);
      };

      getCertificate();
    } catch (err) {
      console.log("Error: certificates get request fail", err);
    }
  }, [id]);

  console.log("자격증 정보 API 테스트", isCertificate);

  /**
   * Send certificate data - PUT request
   * @param {object} event Event object
   */
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title: editTitle,
      description: editDescription,
      when_date: toStringDate(startDate),
    };
    try {
      await Api.put("certificates/" + id, data);

      // Set state when success send request
      setEditTitle("");
      setEditDescription("");
    } catch (err) {
      console.log("Error: certificates put request fail", err);
    }

    setReFetching(new Date());
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
