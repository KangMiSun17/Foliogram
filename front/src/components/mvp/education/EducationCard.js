import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { EditButton, DeleteButton } from "../../common/Button";
import { OwnerContext } from "../../common/context/Context";

/** 학력 목록 컴포넌트입니다.
 *
 * @param {boolean} setIsEditing - 편집중 상태 변경 state
 * @returns EducationList and edit button
 */
function EducationCard({ setIsEditing, education, setEducationList }) {
  const { isEditable } = useContext(OwnerContext);
  const { id, school, major, position } = education.data;

  return (
    <Row className="align-items-center">
      <Col className="mb-3">
        <span>{school}</span>
        <br />
        <span style={{ color: "gray" }}>{major}</span>
        <span style={{ color: "gray", marginLeft: 5 }}>({position})</span>
        <br />
      </Col>
      {isEditable && (
        <>
          <Col sm={1}>
            <EditButton setState={setIsEditing}>편집</EditButton>
          </Col>
          <Col sm={1}>
            <DeleteButton
              endpoint={"educations"}
              id={id}
              setState={setEducationList}
              index={education.index}
            />
          </Col>
        </>
      )}
    </Row>
  );
}

export default EducationCard;
