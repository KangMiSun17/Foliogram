import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import ProfileImage from "./ProfileImage";
import * as Api from "../../api";
import { UserContext } from "../common/context/Context";

function User() {
  const { isEditable, portfolioOwnerId } = useContext(UserContext);
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const [reFetching, setReFetching] = useState(new Date());
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
      {!isEditing && !profileImage && (
        <UserCard
          user={user}
          setIsEditing={setIsEditing}
          setProfileImage={setProfileImage}
          setReFetching={setReFetching}
          isEditable={isEditable}
          isMypage
        />
      )}
    </>
  );
}
export default User;
