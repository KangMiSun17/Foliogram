import React, { useEffect, useState, useContext } from "react";
import { LikesButton } from "./../common/Button";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserStateContext } from "../../App";
import * as Api from "../../api";

function Follow({ user, setReFetching }) {
  const [isFollow, setIsFollow] = useState(false);
  const userState = useContext(UserStateContext);
  const loginedUser = userState.user;

  useEffect(() => {
    try {
      if (loginedUser.following) {
        const targetId = loginedUser.following.filter((id) => id === user?.id);

        if (targetId[0] === user?.id) {
          setIsFollow(true);
        } else {
          setIsFollow(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [loginedUser, user?.id]);

  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      await Api.put("users/" + userState.user.id + "/likes", {
        following: user.id,
        state: !isFollow,
      });
      setIsFollow((cur) => !cur);
    } catch (err) {
      console.log(err);
    }
    setReFetching(new Date());
  };

  return (
    <>
      {isFollow ? (
        <>
          <LikesButton onClickHandler={onClickHandler}>
            <FontAwesomeIcon icon={faHeart} color="red" />
          </LikesButton>
          <span>{user?.follower.length}</span>
        </>
      ) : (
        <>
          <LikesButton onClickHandler={onClickHandler}>
            <FontAwesomeIcon icon={faHeart} />
          </LikesButton>
          <span>{user?.follower.length}</span>
        </>
      )}
    </>
  );
}

export default Follow;
