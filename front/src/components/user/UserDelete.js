import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { OwnerContext } from "./../common/context/Context";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "./../../App";
import * as Api from "../../api";

function UserDelete() {
  const { isEditable } = useContext(OwnerContext);
  const userState = useContext(UserStateContext);
  const navigate = useNavigate();

  const handleUserDelete = (e) => {
    e.preventDefault();

    const deleteUser = async () => {
      try {
        await Api.delete("users", userState.user.id);
        navigate("/login");
      } catch (err) {
        alert("탈퇴에 실패하였습니다.", err);
      }
    };

    const userMessage = prompt(
      '탈퇴를 하시려면 "탈퇴하겠습니다"를 입력해주세요.'
    );

    if (userMessage !== "탈퇴하겠습니다") {
      return;
    }

    const confirmMessage = window.confirm("회원 탈퇴를 진행합니다.");

    if (!confirmMessage) {
      return;
    }

    deleteUser();
  };

  return (
    <>
      {isEditable ? (
        <Button
          size="sm"
          type="submit"
          variant="danger"
          onClick={handleUserDelete}
        >
          회원탈퇴
        </Button>
      ) : null}
    </>
  );
}

export default UserDelete;
