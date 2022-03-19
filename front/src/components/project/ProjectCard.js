import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { EditButton, DeleteButton } from "../common/Button";
import { EditTableContext, ProjectContext } from "../common/context/Context";

/** 수상 이력 목록 컴포넌트입니다.
 *
 * @param {boolean} setIsEditing - 편집중 상태 변경 state
 * @returns projectList and edit button
 */
function ProjectCard({ setIsEditing }) {
  const isEditable = useContext(EditTableContext);
  const { title, description, from_date, to_date } = useContext(ProjectContext);
  return (
    <Row className="align-items-center">
      <Col className="mb-3">
        <span>{title}</span>
        <br />
        <span style={{ color: "gray" }}>{description}</span>
        <br />
        <span style={{ color: "gray" }}>
          {from_date} ~ {to_date}
        </span>
      </Col>
      {isEditable && (
        <>
          <Col sm={1}>
            <EditButton setState={setIsEditing} />
          </Col>
          <Col sm={1}>
            <DeleteButton handleDelete={() => {}} />
          </Col>
        </>
      )}
    </Row>
  );
}

export default ProjectCard;
