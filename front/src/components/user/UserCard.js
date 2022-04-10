import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import { linkStyle } from "../common/Style";
import Follow from "./Follow";

function UserCard({
  isEditable,
  user,
  setIsEditing,
  isNetwork,
  isFollows,
  setProfileImage,
  isMypage,
}) {
  const navigate = useNavigate();
  const [hoverStyle, setHoverStyle] = useState(linkStyle);
  const toggleHover = () =>
    setHoverStyle((cur) => {
      if (cur.textDecoration !== "none") {
        return { ...cur, textDecoration: "none" };
      }
      return { ...cur, textDecoration: "" };
    });

  return (
    <Card className="mb-3 mt-1" style={{ height: "23rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{
              width: "10rem",
              height: "8rem",
              borderRadius: "2rem",
              cursor: "pointer",
            }}
            className="mb-3"
            src={user.profileImage}
            alt="프로필 사진"
            onClick={() => navigate(`/users/${user.id}`)}
          />
        </Row>
        <Card.Title onClick={() => navigate(`/users/${user.id}`)}>
          <span style={{ cursor: "pointer" }}>{user?.name}</span>
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
        <Card.Text
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/users/${user.id}`)}
        >
          {user?.description}
        </Card.Text>

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
      <Card.Text style={hoverStyle}>
        {!isEditable && isMypage && (
          <>
            <Follow user={user} />
            <span>{user?.follower.length}</span>
          </>
        )}
      </Card.Text>
      {(isNetwork || isFollows) && (
        <>
          <div style={{ textAlign: "center" }}>
            <Follow user={user} />
            <span>{user?.follower.length}</span>
          </div>
          <div>
            <Card.Link
              onClick={() => navigate(`/users/${user.id}`)}
              style={hoverStyle}
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
            >
              포트폴리오
            </Card.Link>
          </div>
        </>
      )}
    </Card>
  );
}

export default UserCard;
