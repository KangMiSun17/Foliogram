import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { EditButton } from "../common/Button";
import {
  CertificateContext,
  EditTableContext,
} from "../common/context/Context";
import CertificateEditForm from "./CertificateEditForm";

/**
 * @description This component that shows editing screen or certificate info depending on the isEditing state
 * @returns {component} Certificate information
 */
function Certificate() {
  const isEditable = useContext(EditTableContext);
  const certificate = useContext(CertificateContext);
  const [isEditing, setIsEditing] = useState(false);
  const { title, description, when_date } = certificate;

  return (
    <Row className="align-items-center row">
      {isEditing ? (
        <CertificateEditForm setIsEdit={setIsEditing} />
      ) : (
        <Col className="mb-3">
          <span>{title}</span>
          <br />
          <span style={{ color: "gray" }}>{description}</span>
          <br />
          <span style={{ color: "gray" }}>{when_date}</span>
        </Col>
      )}
      {isEditable && !isEditing && (
        <Col sm={1}>
          <EditButton setState={setIsEditing} />
        </Col>
      )}
    </Row>
  );
}

export default Certificate;
