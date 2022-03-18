import React, { useContext, useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import {
  EditTableContext,
  PortfolioOwnerContext,
} from "../common/context/Context";
import CertificateAddForm from "./CertificateAddForm";
import CertificateCard from "./CertificateCard";
import { PlusButton } from "../common/Button";
import * as Api from "../../api";

/**
 * root component related to certification
 * @returns {component} Completed Certificates
 */
function Certificates() {
  const [certificateList, setCertificateList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const isEditable = useContext(EditTableContext);
  const portfolioOwnerId = useContext(PortfolioOwnerContext);

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
        <Card.Title>자격증</Card.Title>
        <CertificateCard
          certificateList={certificateList}
          setCertificateList={setCertificateList}
        />
        {isEditable && (
          <Row className="justify-content-center mb-4" xs="auto">
            <PlusButton setState={setIsAdding} />
          </Row>
        )}
        {isAdding && (
          <CertificateAddForm
            setCertificateList={setCertificateList}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
