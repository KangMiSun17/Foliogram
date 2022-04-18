import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { EditButton, DeleteButton } from "../../common/Button";
import { OwnerContext } from "../../common/context/Context";

/** 기술 스택 목록 컴포넌트입니다.
 *
 * @param {boolean} setIsEditing - 편집중 상태 변경 state
 * @returns tech stack list and edit button
 */
function TechStackCard({ setIsEditing, techStack, setTechStackList }) {
  const { isEditable } = useContext(OwnerContext);
  const { id, title, description } = techStack.data;

  return (
    <Row className="align-items-center">
      <Col className="mb-3">
        <span>{title}</span>
        <br />
        <span style={{ color: "gray" }}>{description}</span>
        <br />
      </Col>
      {isEditable && (
        <>
          <Col sm={1}>
            <EditButton setState={setIsEditing} />
          </Col>
          <Col sm={1}>
            <DeleteButton
              endpoint={"techstacks"}
              id={id}
              setState={setTechStackList}
              index={techStack.index}
            />
          </Col>
        </>
      )}
    </Row>
  );
}

export default TechStackCard;
