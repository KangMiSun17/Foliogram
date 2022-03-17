import React, { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { CertificateContext, FecthContext } from "./common/Context";
import { toStringDate, toObjectDate } from "./common/DateUtil";
import * as Api from "../../api";

/**
 * @description This component that shows certificate editing screen if isEditing state === true
 * @param {Object} props
 * @param {function} props.setIsEdit - This State is select show edit screen or not show edit screen
 * @returns {component} Certificate edit Form
 */
function CertificateEditForm({ setIsEdit }) {
  const { setIsFetching } = useContext(FecthContext);
  const certificate = useContext(CertificateContext);
  const [isCertificate, setIsCertificate] = useState([]);
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [startDate, setStartDate] = useState(
    toObjectDate(certificate.when_date)
  );

  // Get certificate data only one
  useEffect(() => {
    try {
      const getCertificate = async () => {
        const res = await Api.get("certificates", certificate.id);
        setIsCertificate(res.data);
      };

      getCertificate();
    } catch (err) {
      console.log("Error: certificates get request fail", err);
    }
  }, [certificate.id]);

  console.log("자격증 정보 API 테스트", isCertificate);

  /**
   * Send certificate data - PUT request
   * @param {object} event Event object
   */
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const data = { title, description, when_date: toStringDate(startDate) };
    try {
      await Api.put("certificates/" + certificate.id, data);

      // Set state when success send request
      setTitle("");
      setDescription("");
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
          value={title}
          placeholder="자격증 제목"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="certificateEditDescription">
        <Form.Control
          type="editDescription"
          value={description}
          placeholder="상세내역"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <div className="mt-3 mb-4 text-center row">
        <div className="col-sm-20">
          <Button
            className="me-3"
            variant="primary"
            type="submit"
            onClick={handleEditSubmit}
          >
            확인
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              setIsEdit(false);
            }}
          >
            취소
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default CertificateEditForm;
