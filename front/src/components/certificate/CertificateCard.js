import React from "react";
import Certificate from "./Certificate";

/**
 * This component make up the list of certifications
 * @returns {component} List of certificate component
 */
function CertificateCard({ certificateList, setCertificateList }) {
  return (
    <>
      {certificateList.map((certificate, index) => (
        <Certificate
          key={certificate.id}
          index={index}
          certificate={certificate}
          setCertificateList={setCertificateList}
        />
      ))}
    </>
  );
}

export default CertificateCard;
