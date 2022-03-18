import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { FetchContext, EditTableContext } from "../common/context/Context";
import CertificateAddForm from "./CertificateAddForm";
import Certificates from "./Certificates";
import { PlusButton } from "../common/Button";

/**
 * @description root component related to certification
 * @returns {component} Complete Certificate Card
 */
function CertificateCard() {
  const [isAdding, setIsAdding] = useState(false);
  const [reFetching, setReFetching] = useState(new Date());
  const isEditable = useContext(EditTableContext);

  return (
    <Card className="me-4">
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        <FetchContext.Provider value={{ reFetching, setReFetching }}>
          <Certificates />
          {isEditable && (
            <div className="mt-3 text-center mb-4 row">
              <div className="col-sm-20">
                <PlusButton setState={setIsAdding} />
              </div>
            </div>
          )}
          {isAdding && <CertificateAddForm setIsAdding={setIsAdding} />}
        </FetchContext.Provider>
      </Card.Body>
    </Card>
  );
}

export default CertificateCard;
