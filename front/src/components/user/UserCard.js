import { useNavigate } from "react-router-dom";
import { Card, Row } from "react-bootstrap";
import { linkStyle } from "../common/Style";
import Follow from "../follow/Follow";

function UserCard({ user, children, isNetwork, isFollows }) {
  const navigate = useNavigate();

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
      </Card.Body>
      {children}
      {(isNetwork || isFollows) && (
        <>
          <div style={{ textAlign: "center" }}>
            <Follow user={user} />
            <span>{user?.follower.length}</span>
          </div>
          <div>
            <Card.Link
              onClick={() => navigate(`/users/${user.id}`)}
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.textDecoration = "")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
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
