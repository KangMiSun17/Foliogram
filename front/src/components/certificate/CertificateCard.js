import React, { useContext, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { UserStateContext } from "../../App";
import CertificateAddForm from "./CertificateAddForm";
import Certificates from "./Certificates";

function CertificateCard({ portfolioOwnerId }) {
  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const userState = useContext(UserStateContext);

  /**
   * 포트폴리오의 주인인지 확인하여 isOwner의 상태 변경
   * @param { string } userState.user.id - 로그인 되어있는 유저의 id
   * @param { string } portfolioOwnerId - 엔드포인트 params :id
   * **/
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
        <Certificates portfolioOwnerId={portfolioOwnerId} />
        {isOwner && (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            +
          </Button>
        )}
        {isEditing && <CertificateAddForm setIsEditing={setIsEditing} />}
      </Card.Body>
    </Card>
  );
}

export default CertificateCard;
