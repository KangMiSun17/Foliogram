import React, { useContext, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { FetchContext, EditTableContext } from "../common/context/Context";
import CertificateAddForm from "./CertificateAddForm";
import CertificateCard from "./CertificateCard";
import { PlusButton } from "../common/Button";

/**
 * @description root component related to certification
 * @returns {component} Complete Certificate Card
 */
function Certificates() {
  const [isAdding, setIsAdding] = useState(false);
  const [reFetching, setReFetching] = useState(new Date());
  const isEditable = useContext(EditTableContext);

  return (
    <Card className="me-4 mt-3 mb-3">
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        <FetchContext.Provider value={{ reFetching, setReFetching }}>
          <CertificateCard />
          {isEditable && (
            <Row className="justify-content-center mb-4" xs="auto">
              <PlusButton setState={setIsAdding} />
            </Row>
          )}
          {isAdding && <CertificateAddForm setIsAdding={setIsAdding} />}
        </FetchContext.Provider>
      </Card.Body>
    </Card>
  );
}

export default Certificates;
