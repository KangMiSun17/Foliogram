import React, { useEffect, useState, useContext } from "react";
import { LikesButton } from "./../common/Button";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserStateContext, DispatchContext } from "../../App";
import * as Api from "../../api";

function Follow({ user, setReFetching }) {
  const [isFollow, setIsFollow] = useState(null);
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const loginedUser = userState.user;

  useEffect(() => {
    const targetId = loginedUser.following.filter((id) => id === user?.id);

    if (targetId[0] === user?.id) {
      setIsFollow(true);
      return;
    }

    setIsFollow(false);
  }, [loginedUser, user?.id]);

  const onClickHandler = async (e) => {
    e.preventDefault();
    setIsFollow((cur) => !cur);
    try {
      const res = await Api.put("users/" + userState.user.id + "/likes", {
        following: user.id,
        state: !isFollow,
      });

      const data = {
        ...loginedUser,
        following: res.data.following.map((item) => item.id),
      };

      dispatch({ type: "FOLLOW", payload: data });
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
