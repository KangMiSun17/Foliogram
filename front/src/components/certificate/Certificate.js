import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DeleteButton, EditButton } from "../common/Button";
import { UserContext } from "../common/context/Context";
import CertificateEditForm from "./CertificateEditForm";

/**
 * This component is show editing screen or certificate info depending on the isEditing state
 * @param {Object} props
 * @param {object} props.certificate Item in the Certification List
 * @param {number} props.index Index in the Certification List
 * @returns {component} Certificate information or EditForm
 */
function Certificate({ certificate, index, setCertificateList }) {
  const { isEditable } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const { id, title, description, when_date } = certificate;

  /**
   * @description isEditing {type: boolean} if true show CertificateEditForm
   * @description isEditable {type: boolean} if isEditable true and isEditing false show EditButton
   */
  return (
    <Row className="align-items-center row p-3 pb-0">
      {isEditing ? (
        <CertificateEditForm
          certificate={certificate}
          setIsEdit={setIsEditing}
          index={index}
        />
      ) : (
        <Col>
          <span>{title}</span>
          <br />
          <span style={{ color: "gray" }}>{description}</span>
          <br />
          <span style={{ color: "gray" }}>{when_date}</span>
        </Col>
      )}
      {isEditable && !isEditing && (
        <>
          <Col sm={1}>
            <EditButton setState={setIsEditing} />
          </Col>
          <Col sm={1}>
            <DeleteButton
              endpoint={"certificates"}
              id={id}
              setState={setCertificateList}
              index={index}
            />
          </Col>
        </>
      )}
    </Row>
  );
}

export default Certificate;
