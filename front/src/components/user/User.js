import React, { useState, useEffect, useContext } from "react";
import { OwnerContext } from "./../common/context/Context";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import ProfileImage from "./ProfileImage";
import * as Api from "../../api";

function User({ isEditable }) {
  const { portfolioOwnerId } = useContext(OwnerContext);
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);
  if (!user) {
    return (
      <>
        <p>......Loading</p>
      </>
    );
  }
  if (isEditing) {
    return (
      <>
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      </>
    );
  } else if (profileImage) {
    return (
      <>
        <ProfileImage
          user={user}
          setProfileImage={setProfileImage}
          setUser={setUser}
        />
      </>
    );
  } else {
    return (
      <>
        <UserCard
          user={user}
          setIsEditing={setIsEditing}
          setProfileImage={setProfileImage}
          isEditable={isEditable}
        />
      </>
    );
  }
}

export default User;
