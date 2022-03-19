import { Card, Row, Button, Col } from "react-bootstrap";

/**
 * @param {Object} val - eduList 배열 안에 있는 각각의 객체, 예시:{ school: "서울대학교", major: "컴퓨터", position: "박사졸업" }
 * @param {Boolean} isEditable - 편집 가능한지 여부(여기선 자신의 내용이면 편집버튼을 구현하기 위해 가져옴)
 * @param {Boolean} setIsEditing - 편집 가능한지 여부(여기선 편집 버튼을 누르면 편집이 가능한 상태(편집이 가능한 페이지)로 만들기위해 가져옴)
 * @returns (\<EducationCard val={val} isEditable={isEditable} setIsEditing={setIsEditing}></EducationCard>)
 */
function EducationCard({ val, isEditable, setIsEditing }) {
  return (
    <div>
      <Row>
        <Col xs={11}>
          {val.school}
          <Card.Subtitle className="mb-2 text-muted">
            {val.major}
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
