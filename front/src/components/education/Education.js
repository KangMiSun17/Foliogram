import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import * as Api from "../../api";
import EducationAddForm from "./EducationAddForm";
import Educations from "./Educations";

/**
 * @param {string} portfolioOwnerId - 로그인 되어있는지 여부 확인용
 * @param {string} isEditable - 사용자가 편집 가능한지 여부
 * @returns (<Education portfolioOwnerId={portfolioOwner.id} isEditable={portfolioOwner.id === userState.user?.id}/>)
 */
function Education({ portfolioOwnerId, isEditable }) {
  /**
   *
   * @param {Array} eduList - 각 사용자(아이디)에 맞는 학력 정보 리스트
   * @param {function} setEduList - eduList 상태를 변경할 수 있는 함수
   */
  const [eduList, setEduList] = useState([
    { school: "서울대학교", major: "컴퓨터", position: "박사졸업" },
    { school: "서울고등학교", major: "이공계", position: "재학중" },
    { school: "서울중학교", major: "학생", position: "재학중" },
  ]);
  /**
   *
   * @param {Boolean} showAddForm - +버튼 추가할지 안할지 여부
   * @param {function} setShowAddForm - showAddForm 상태를 변경할 수 있는 함수
   */
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
          {/* (map을 통해 <Educations/>컴포넌트에 각 eduList의 내용(객체)을 주입 후 해당 컴포넌트 생성) */}
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

          {/* (isEditable이 true면 수정 가능한 상태 즉 로그인이 되어있는 상태이므로 && 오른쪽에 있는 내용을 출력(+버튼 컴포넌트)) */}
          {isEditable && (
            <Row style={{ textAlign: "center" }}>
              <Col className="mb-4">
                <Button onClick={() => setShowAddForm(true)}>+</Button>
              </Col>
            </Row>
          )}

          <Row>
            {/* (showAddForm이 true면 +버튼을 누른 것을 의미, 그러므로 && 오른쪽에 있는 내용을 출력하여 새로운 내용을 기입할 수 있는 컴포넌트를 보여줌) */}
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
