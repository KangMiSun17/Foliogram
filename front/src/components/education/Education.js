import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import * as Api from "../../api";
import EducationAddForm from "./EducationAddForm";
import Educations from "./Educations";

function Education({ portfolioOwnerId, isEditable }) {
  const [eduList, setEduList] = useState([
    { title: "서울대학교", desc: "컴퓨터", position: "박사졸업" },
    { title: "서울고등학교", desc: "이공계", position: "재학중" },
    { title: "서울중학교", desc: "학생", position: "재학중" },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);

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
          {eduList.map((val, index) => {
            return (
              <Educations
                key={index}
                val={val}
                eduList={eduList}
                setEduList={setEduList}
                isEditable={isEditable}
              />
            );
          })}
          {isEditable && (
            <Row style={{ textAlign: "center" }}>
              <Col className="mb-4">
                <Button onClick={() => setShowAddForm(true)}>+</Button>
              </Col>
            </Row>
          )}

          <Row>
            {showAddForm && (
              <EducationAddForm
                eduList={eduList}
                setEduList={setEduList}
                setShowAddForm={setShowAddForm}
              ></EducationAddForm>
            )}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Education;
