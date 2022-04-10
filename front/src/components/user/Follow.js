import React, { useEffect, useState, useContext } from "react";
import { LikesButton } from "./../common/Button";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Api from "../../api";
import { UserContext } from "../common/context/UserContext";

function Follow({ user }) {
  const [isFollow, setIsFollow] = useState(null);
  const { userState, dispatch, setReFetching } = useContext(UserContext);
  const loginedUser = userState.user;

  useEffect(() => {
    if (!loginedUser) {
      return;
    }

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
        </>
      ) : (
        <>
          <LikesButton onClickHandler={onClickHandler}>
            <FontAwesomeIcon icon={faRegularHeart} />
          </LikesButton>
        </>
      )}
    </>
  );
}

export default Follow;
