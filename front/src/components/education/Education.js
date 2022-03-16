import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import * as Api from "../../api";
import Educations from "./Educations";

function Education({ portfolioOwnerId, isEditable }) {
  const [eduList, setEduList] = useState([
    { id: 1, title: "서울대학교", desc: "광고" },
    { id: 2, title: "재현고등학교", desc: "이공계" },
  ]);

  // useEffect(() => {
  //   Api.get("educationlist", portfolioOwnerId).then((res) =>
  //     setEduList(res.data)
  //   );
  // }, []);
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>학력</Card.Title>
          {eduList.map((val) => {
            return (
              <>
                <Educations
                  title={val.title}
                  desc={val.desc}
                  isEditable={isEditable}
                />
              </>
            );
          })}
          <Row style={{ textAlign: "center" }}>
            <Col>
              <Button>+</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Education;
