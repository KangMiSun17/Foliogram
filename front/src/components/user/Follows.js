import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import UserCard from "./UserCard";
import { UserContext } from "../common/context/UserContext";

function Follows() {
  const navigate = useNavigate();
  const { users, userState } = useContext(UserContext);

  useEffect(() => {
    if (!userState.user) {
      navigate("/");
      return;
    }
  }, [userState.user, navigate]);

  const filterFollowUsers = users
    .filter((user) => userState.user.following.includes(user.id))
    .filter((user) => user.id !== userState.user.id);

  return (
    <Container
      fluid
      style={{ height: "auto", minHeight: "100%", paddingBottom: "250px" }}
    >
      <>
        {filterFollowUsers.length > 0 ? (
          <Row xs="auto">
            {filterFollowUsers.map((user) => (
              <Col sm={3} key={user.id}>
                <UserCard user={user} isFollows />
              </Col>
            ))}
          </Row>
        ) : (
          <>
            <div
              style={{
                display: "block",
                textAlign: "center",
              }}
            >
              <img
                src="/letsFollow.png"
                alt="follow"
                width="500"
                height="500"
                onClick={() => navigate("/network")}
              />
            </div>
            <div
              className="mt-4"
              style={{
                color: "#303B4B",
                display: "block",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <p>이미지를 누르시면 전체 목록으로 이동합니다.</p>
            </div>
          </>
        )}
      </>
    </Container>
  );
}

export default Follows;
