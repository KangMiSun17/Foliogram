import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import { useState } from "react";

function UserCard({
  isEditable,
  user,
  setIsEditing,
  isNetwork,
  setProfileImage,
}) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const toggleHover = () => {
    setHover((cur) => !cur);
  };
  let linkStyle = {};

  if (hover) {
    linkStyle = { color: "black", width: "40%", margin: "10px auto" };
  } else {
    linkStyle = {
      color: "black",
      width: "40%",
      margin: "10px auto",
      textDecoration: "none",
    };
  }

  return (
    <Card className="mb-3 mt-1" style={{ height: "22rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{
              width: "10rem",
              height: "8rem",
              borderRadius: "3rem",
              cursor: "pointer",
            }}
            className="mb-3"
            src={user.profileImage}
            alt="프로필 사진"
            onClick={() => navigate(`/users/${user.id}`)}
          />
        </Row>
        <Card.Title onClick={() => navigate(`/users/${user.id}`)}>
          {user?.name}
          <span
            style={{
              marginLeft: "5px",
              fontSize: "13px",
              color: "gray",
            }}
          >
            {user?.user_category}
          </span>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Row className="mt-4 text-center text-info">
            <Col sm={{ span: 20 }}>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                정보 편집
              </Button>
              <Button
                className="ms-3"
                variant="outline-primary"
                size="sm"
                onClick={() => setProfileImage(true)}
              >
                프로필사진 편집
              </Button>
            </Col>
          </Row>
        )}
      </Card.Body>
      {isNetwork && (
        <Card.Link
          href="#"
          onClick={() => navigate(`/users/${user.id}`)}
          style={linkStyle}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          포트폴리오
        </Card.Link>
      )}
    </Card>
  );
}

export default UserCard;
