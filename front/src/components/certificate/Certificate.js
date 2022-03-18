import React, { useContext, useState } from "react";
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
    <div className="align-items-center row">
      {isEditing ? (
        <CertificateEditForm setIsEdit={setIsEditing} />
      ) : (
        <div className="col">
          <p className="mb-0">{title}</p>
          <p className="mb-0">{description}</p>
          <p>{when_date}</p>
        </div>
      )}
      {isEditable && !isEditing && (
        <div className="col-lg-1 col">
          <EditButton setState={setIsEditing} />
        </div>
      )}
    </div>
  );
}

export default Certificate;
