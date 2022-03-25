import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import Follow from "./Follow";

function UserCard({
  isEditable,
  user,
  setIsEditing,
  isNetwork,
  setProfileImage,
  setReFetching,
}) {
  const navigate = useNavigate();

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src={user.profileImage}
            alt="프로필 사진"
          />
        </Row>
        <Card.Title>
          {user?.name}
          <span style={{ marginLeft: "5px", fontSize: "13px", color: "gray" }}>
            {user?.user_category}
          </span>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  정보 편집
                </Button>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setProfileImage(true)}
                >
                  프로필사진 편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <>
            <Follow user={user} setReFetching={setReFetching} />
            <Card.Link
              className="mt-3"
              href="#"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              포트폴리오
            </Card.Link>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
