import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { UserStateContext } from "../../App";
// import * as Api from "../../api";
import axios from "axios";

function CertificateAddForm({ setAdding }) {
  const userState = useContext(UserStateContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  /**
   * POST 요청 양식 "YYYY-MM-DD"
   * 날짜를 YYYY-MM-DD 포맷으로 변경
   * @param { number } year
   * @param { number } month
   * @param { number } day
   **/
  const getStringDate = () => {
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();

    return `${year}-${month >= 10 ? month : "0" + month}-${
      day >= 10 ? day : "0" + day
    }`;
  };

  /**
   * Submit - POST요청
   * @param { string } date - "YYYY-MM-DD"
   * @param { string } title - 자격증 제목
   * @param { string } description - 자격증 상세 내역
   * @param { object } userState - 로그인된 유저의 정보
   * @param { function } setIsEditing - 요청 완료 후 setIsEditing 상태를 변경하여 폼 닫기
   **/
  const onSubmit = async (e) => {
    e.preventDefault();
    const date = getStringDate();

    try {
      await axios.post("http://localhost:3001/certificate", {
        user_id: userState.user.id,
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

    setAdding(false);
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
          setAdding(false);
        }}
      >
        취소
      </Button>
    </Form>
  );
}

export default CertificateAddForm;
