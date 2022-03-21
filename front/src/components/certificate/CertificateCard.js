import React, { useContext } from "react";
import Certificate from "./Certificate";
import { CertificateContext } from "../common/context/Context";

/**
 * This component make up the list of certifications
 * @returns {component} List of certificate component
 */
function CertificateCard() {
  const { certificateList } = useContext(CertificateContext);
  return (
    <>
      {certificateList.map((certificate, index) => (
        <Certificate
          key={certificate.id}
          index={index}
          certificate={certificate}
        />
      ))}
    </>
  );
}

export default CertificateCard;
