import React, { useEffect, useState, useContext } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { CertificateContext, FecthContext } from "./common/Context";
import { toStringDate, toObjectDate } from "./common/DateUtil";
import { BundleButton } from "./common/Button";
import * as Api from "../../api";

/**
 * @description This component that shows certificate editing screen if isEditing state === true
 * @param {Object} props
 * @param {function} props.setIsEdit - This State is select show edit screen or not show edit screen
 * @returns {component} Certificate edit Form
 */
function CertificateEditForm({ setIsEdit }) {
  const { setIsFetching } = useContext(FecthContext);
  const { id, title, description, when_date } = useContext(CertificateContext);
  const [isCertificate, setIsCertificate] = useState([]);
  const [modTitle, setModTitle] = useState(title);
  const [modDescription, setModDescription] = useState(description);
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
      title: modTitle,
      description: modDescription,
      when_date: toStringDate(startDate),
    };
    try {
      await Api.put("certificates/" + id, data);

      // Set state when success send request
      setModTitle("");
      setModDescription("");
    } catch (err) {
      console.log("Error: certificates put request fail", err);
    }

    setIsFetching(new Date());
    setIsEdit(false);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="certificateEditName">
        <Form.Control
          type="editName"
          value={modTitle}
          placeholder="자격증 제목"
          onChange={(e) => setModTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="certificateEditDescription">
        <Form.Control
          type="editDescription"
          value={modDescription}
          placeholder="상세내역"
          onChange={(e) => setModDescription(e.target.value)}
        />
      </Form.Group>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      {BundleButton(handleEditSubmit, setIsEdit)}
    </Form>
  );
}

export default CertificateEditForm;
