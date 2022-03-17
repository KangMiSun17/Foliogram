import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { CertificateContext, OwnerContext } from "./common/Context";
import CertificateEditForm from "./CertificateEditForm";

/**
 * @description This component that shows editing screen or certificate info depending on the isEditing state
 * @returns {component} Certificate information
 */
function Certificate() {
  const { isOwner } = useContext(OwnerContext);
  const certificate = useContext(CertificateContext);
  const [isEditing, setIsEditing] = useState(false);
  const { title, description, when_date } = certificate;

  return (
    <div>
      {isEditing ? (
        <CertificateEditForm setIsEdit={setIsEditing} />
      ) : (
        <>
          <p className="mb-0">{title}</p>
          <p className="mb-0">{description}</p>
          <p>{when_date}</p>
        </>
      )}
      {isOwner && !isEditing && (
        <Button variant="outline-info" onClick={() => setIsEditing(true)}>
          편집
        </Button>
      )}
    </div>
  );
}

export default Certificate;
