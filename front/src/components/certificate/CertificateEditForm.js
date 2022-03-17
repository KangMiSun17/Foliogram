import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { CertificateContext, FecthContext } from "./common/Context";
import { StringDate } from "./common/StringDate";

function CertificateEditForm({ setIsEdit }) {
  const { setIsFetching } = useContext(FecthContext);
  const certificate = useContext(CertificateContext);
  const [isCertificate, setIsCertificate] = useState([]);
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [startDate, setStartDate] = useState(new Date(certificate.when_date));

  useEffect(() => {
    const getCertificate = async () => {
      const res = await axios.get(
        "http://localhost:3001/certificate/" + certificate.id
      );
      setIsCertificate(res.data);
    };

    getCertificate();
  }, [certificate.id]);

  console.log("자격증", isCertificate);

  const onSubmit = async (e) => {
    e.preventDefault();
    const date = StringDate(startDate);

    try {
      await axios.put("http://localhost:3001/certificate/" + certificate.id, {
        title,
        description,
        when_date: date,
      });

      // * 요청이 성공적으로 끝나면 상태 초기화
      setTitle("");
      setDescription("");
    } catch (e) {
      console.log("error", e);
    }

    setIsFetching(new Date());
    setIsEdit(false);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control
          type="name"
          value={title}
          placeholder="자격증 제목"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicHistory">
        <Form.Control
          type="certificateHistory"
          value={description}
          placeholder="상세내역"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <Button variant="primary" type="submit" onClick={onSubmit}>
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
    </Form>
  );
}

export default CertificateEditForm;
