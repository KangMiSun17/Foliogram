import { Card, CardText, Row, Button, Col } from "react-bootstrap";

function EducationCard({ val, isEditable, setIsEditing }) {
  return (
    <div>
      <Row>
        <Col xs={11}>
          {val.title}
          <Card.Subtitle className="mb-2 text-muted">
            {val.desc}
            <span style={{ display: "inline-block", margin: 3 }}>
              ({val.position})
            </span>
          </Card.Subtitle>
        </Col>
        <Col className="mt-3">
          {isEditable && (
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              편집
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default EducationCard;
