import React from "react";
import Certificate from "./Certificate";

/**
 * @description This component that get list of certifications and show screen
 * @returns {component} List of certificate
 */
function CertificateCard({ certificateList, setCertificateList }) {
  return (
    <>
      {certificateList.map((certificate, index) => (
        <Certificate
          key={certificate.id}
          setCertificateList={setCertificateList}
          index={index}
          certificate={certificate}
        />
      ))}
    </>
  );
}

export default CertificateCard;
