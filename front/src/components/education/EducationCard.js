import { useNavigate } from "react-router-dom";
import { Card, CardText, Row, Button, Col } from "react-bootstrap";

function EducationCard(portfolioOwnerId, isEditable) {
  const navigate = useNavigate();
  return (
    <CardText>
      <Row>
        <Col></Col>
        <Col>
          <Button></Button>
        </Col>
      </Row>
    </CardText>
  );
}

export default EducationCard;
