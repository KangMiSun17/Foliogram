import React, { useState, useEffect, useContext } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import ProfileImage from "./ProfileImage";
import { Card, Row, Button, Col } from "react-bootstrap";
import Follow from "../follow/Follow";
import { linkStyle } from "../common/Style";
import * as Api from "../../api";
import { OwnerContext } from "../common/context/Context";
import { UserContext } from "../common/context/UserContext";

function User() {
  const { isEditable, portfolioOwnerId } = useContext(OwnerContext);
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const { reFetching } = useContext(UserContext);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId, reFetching]);

  if (!user) {
    return (
      <>
        <p>......Loading</p>
      </>
    );
  }

  return (
    <>
      {isEditing && (
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      )}

      {profileImage && (
        <ProfileImage
          user={user}
          setProfileImage={setProfileImage}
          setUser={setUser}
        />
      )}

      {!isEditing && !profileImage && !isEditable && (
        <UserCard user={user}>
          <Card.Text style={linkStyle}>
            <Follow user={user} />
            <span>{user?.follower.length}</span>
          </Card.Text>
        </UserCard>
      )}

      {isEditable && (
        <UserCard user={user}>
          <Row className="mt-4 text-center text-info">
            <Col sm={{ span: 20 }}>
              <Button
                className="mb-3"
                variant="outline-primary"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                정보 편집
              </Button>
              <Button
                className="ms-3 mb-3"
                variant="outline-primary"
                size="sm"
                onClick={() => setProfileImage(true)}
              >
                프로필사진 편집
              </Button>
            </Col>
          </Row>
        </UserCard>
      )}
    </>
  );
}
export default User;
