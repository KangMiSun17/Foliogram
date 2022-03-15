import React, { useState } from "react";
import { Button } from "@mui/material";

//수상 이력 편집 컴포넌트입니다.
function AwardEditForm() {
  const [isEditing, setIsEditing] = useState(false);
  const startEditing = () => {
    setIsEditing((cur) => !cur);
  };
  return (
    <>
      <Button onClick={startEditing}>편집</Button>
      {isEditing && (
        <div>
          <input />
          <Button onClick={startEditing}>확인</Button>
        </div>
      )}
    </>
  );
}

export default AwardEditForm;
