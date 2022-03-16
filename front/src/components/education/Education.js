import React, { useState, useEffect } from "react";
import { Row, Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import * as Api from "../../api";
import Educations from "./Educations";

function Education({ portfolioOwnerId, isEditable }) {
  const [eduList, setEduList] = useState([]);

  useEffect(() => {
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEduList(res.data)
    );
  }, [portfolioOwnerId]);
  return (
    <>
      <Card>
        <Card.Body style={{ textAlign: "left" }}>
          <Card.Title>학력</Card.Title>
          <Card.Subtitle>여기에 이제 목록을 넣어야 하지요</Card.Subtitle>
          <Card.Text>
            데이터를 가져와 뿌려야 하는데 여기서부터 다시 시작입니다
          </Card.Text>
          {/* {setEduList.map((val) => {
          <Educations
            key={val.id}
            title={val.title}
            desc={val.desc}
            isEditable={isEditable}
          />;
        })} */}
        </Card.Body>
      </Card>
    </>
  );
}

export default Education;
