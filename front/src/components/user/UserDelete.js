import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { OwnerContext } from "./../common/context/Context";

function UserDelete() {
  const { isEditable } = useContext(OwnerContext);

  const handleUserDelete = (e) => {
    e.preventDefault();
    const userMessage = prompt(
      '탈퇴를 하시려면 "탈퇴하겠습니다"를 입력해주세요.'
    );

    if (userMessage !== "탈퇴하겠습니다") {
      return;
    }

    const confirmMessage = window.confirm("회원 탈퇴를 진행합니다.");
    alert(confirmMessage);

    if (confirmMessage) {
      // 탈퇴 요청 API
      try {
        console.log("탈퇴 성공");
        return;
      } catch (err) {
        console.log("탈퇴에 실패하였습니다.".err);
      }
    }
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
