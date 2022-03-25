import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { EditButton, DeleteButton } from "../common/Button";
import {
  UserContext,
  TechStackContext,
  TechStackFetchContext,
} from "../common/context/Context";

/** 수상 이력 목록 컴포넌트입니다.
 *
 * @param {boolean} setIsEditing - 편집중 상태 변경 state
 * @returns projectList and edit button
 */
function TechStackCard({ setIsEditing }) {
  const { setReFetching } = useContext(TechStackFetchContext);
  const { isEditable } = useContext(UserContext);
  const { id, title, description } = useContext(TechStackContext);
  return (
    <Row className="align-items-center">
      <Col className="mb-3">
        <span>{title}</span>
        <br />
        <span style={{ color: "gray" }}>{description}</span>
        <br />
        {/* <span style={{ color: "gray" }}>
          {from_date} ~ {to_date}
        </span> */}
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
              setState={setReFetching}
            />
          </Col>
        </>
      )}
    </Row>
  );
}

export default TechStackCard;
