import React, { useContext, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import {
  OwnerContext,
  FetchContext,
  PortfolioOwnerContext,
} from "../common/Context";
import CertificateAddForm from "./CertificateAddForm";
import Certificates from "./Certificates";
import { UserStateContext } from "../../App";

/**
 * @description root component related to certification
 * @returns {component} Complete Certificate Card
 */
function CertificateCard() {
  const [isOwner, setIsOwner] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isFetching, setIsFetching] = useState(new Date());
  const userState = useContext(UserStateContext);
  const portfolioOwnerId = useContext(PortfolioOwnerContext);

  // Checking login user id equals portfolio id
  useEffect(() => {
    if (userState.user.id === portfolioOwnerId) {
      setIsOwner(true);
      return;
    }
    setIsOwner(false);
  }, [userState.user.id, portfolioOwnerId]);

  return (
    <Card className="me-4">
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        <FetchContext.Provider value={{ isFetching, setIsFetching }}>
          <OwnerContext.Provider value={{ isOwner }}>
            <Certificates />
          </OwnerContext.Provider>
          {isOwner && (
            <div className="mt-3 text-center mb-4 row">
              <div className="col-sm-20">
                <Button variant="primary" onClick={() => setIsAdding(true)}>
                  +
                </Button>
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
