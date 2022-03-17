import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { OwnerContext } from "./common/Context";
import CertificateEditForm from "./CertificateEditForm";

function Certificate({ certificate }) {
  const { isOwner } = useContext(OwnerContext);
  const [isEditing, setIsEditing] = useState(false);
  const { title, description, when_date } = certificate;

  return (
    <div>
      {isEditing ? (
        <CertificateEditForm edit={setIsEditing} certificate={certificate} />
      ) : (
        <>
          <p className="mb-0">{title}</p>
          <p className="mb-0">{description}</p>
          <p>{when_date}</p>
        </>
      )}
      {isOwner && (
        <Button variant="outline-info" onClick={() => setIsEditing(true)}>
          편집
        </Button>
      )}
    </div>
  );
}

export default Certificate;
