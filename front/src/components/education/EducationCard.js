import { useNavigate } from "react-router-dom";
import { Card, CardText, Row, Button, Col } from "react-bootstrap";

function EducationCard({ title, desc, isEditable }) {
  const navigate = useNavigate();
  return (
    <Card.Text>
      {title}
      <Row>
        <Col xs={11}>{desc}</Col>
        <Col>
          {isEditable && (
            <Button variant="outline-info" size="sm">
              편집
            </Button>
          )}
        </Col>
      </Row>
    </Card.Text>
  );
}

export default EducationCard;
