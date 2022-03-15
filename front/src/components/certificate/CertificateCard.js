import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import CertificateAddForm from "./CertificateAddForm";

function CertificateCard() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        <Card.Text>
          <h3>1234</h3>
          1234
          <br />
          날짜
        </Card.Text>
        <Button variant="primary" onClick={() => setIsEditing(true)}>
          +
        </Button>
        {isEditing && <CertificateAddForm setIsEditing={setIsEditing} />}
      </Card.Body>
    </Card>
  );
}

export default CertificateCard;
