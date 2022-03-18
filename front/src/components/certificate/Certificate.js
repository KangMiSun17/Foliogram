import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { EditButton } from "../common/Button";
import { EditTableContext } from "../common/context/Context";
import CertificateEditForm from "./CertificateEditForm";

/**
 * This component is show editing screen or certificate info depending on the isEditing state
 * @param {Object} props
 * @param {object} props.certificate Item in the Certification List
 * @param {number} props.index Index in the Certification List
 * @param {function} props.setCertificateList function to change the state of a list of certificates
 * @returns {component} Certificate information or EditForm
 */
function Certificate({ certificate, index, setCertificateList }) {
  const isEditable = useContext(EditTableContext);
  const [isEditing, setIsEditing] = useState(false);
  const { title, description, when_date } = certificate;

  /**
   * @description isEditing {type: boolean} if true show CertificateEditForm
   * @description isEditable {type: boolean} if isEditable true and isEditing false show EditButton
   */
  return (
    <Row className="align-items-center row">
      {isEditing ? (
        <CertificateEditForm
          certificate={certificate}
          setIsEdit={setIsEditing}
          setCertificateList={setCertificateList}
          index={index}
        />
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
