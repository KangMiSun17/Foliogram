import { useNavigate } from "react-router-dom";
import { Card, CardText, Row, Button, Col } from "react-bootstrap";

function EducationCard(portfolioOwnerId, isEditable) {
  const navigate = useNavigate();
  return (
    <Card.Text>
      <Row>
        <Col></Col>
        <Col>
          <Button></Button>
        </Col>
      </Row>
    </Card.Text>
  );
}

export default EducationCard;
