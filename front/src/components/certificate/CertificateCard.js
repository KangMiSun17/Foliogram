import React, { useContext, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { UserStateContext } from "../../App";
import {
  OwnerContext,
  FecthContext,
  PortfolioOwnerContext,
} from "./common/Context";
import CertificateAddForm from "./CertificateAddForm";
import Certificates from "./Certificates";

/**
 * @description root component related to certification
 * @returns {component} Complete Certificate Card
 */
function CertificateCard() {
  const [isOwner, setIsOwner] = useState(false);
  const [isAddingg, setIsAdding] = useState(false);
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
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        <FecthContext.Provider value={{ isFetching, setIsFetching }}>
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
          {isAddingg && <CertificateAddForm setIsAdding={setIsAdding} />}
        </FecthContext.Provider>
      </Card.Body>
    </Card>
  );
}

export default CertificateCard;
