import React, { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { OwnerContext } from "../common/context/Context";
import CertificateAddForm from "./CertificateAddForm";
import CertificateCard from "./CertificateCard";
import * as Api from "../../api";

/**
 * root component related to certification
 * @returns {component} Completed Certificates
 */
function Certificates() {
  const [certificateList, setCertificateList] = useState([]);
  const { isEditable, portfolioOwnerId } = useContext(OwnerContext);

  // All certificate list get API request
  useEffect(() => {
    try {
      const getCertificateList = async () => {
        const res = await Api.get("certificatelist/" + portfolioOwnerId);
        setCertificateList(res.data);
      };

      getCertificateList();
    } catch (err) {
      console.log("Error: certificatelist get request fail", err);
    }
  }, [portfolioOwnerId]);

  /**
   * @description isEditable {type: boolean} if true show PlusButton
   * @description isAdding {type: boolean} if true show CertificateAddForm
   */
  return (
    <Card className="me-4 mt-3 mb-3">
      <Card.Body>
        <Card.Title className="mb-3">자격증</Card.Title>
        <Card.Body>
          <CertificateCard
            certificateList={certificateList}
            setCertificateList={setCertificateList}
          />
        </Card.Body>
        {isEditable && (
          <CertificateAddForm setCertificateList={setCertificateList} />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
