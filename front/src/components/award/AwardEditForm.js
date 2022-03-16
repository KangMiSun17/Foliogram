import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

//수상 이력 편집 컴포넌트입니다.
function AwardEditForm({ isEditable, award, setAwards, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editAward, setEditAward] = useState(award);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAwards(editAward);
  };

  const startEditing = () => {
    setIsEditing((cur) => !cur);
  };

  return (
    <>
      {isEditable && (
        <>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <TextField
                id="standard-required"
                label="수정할 내용"
                variant="standard"
                value={editAward}
                onChange={(e) => setEditAward(e.target.value)}
              />
              <Button onClick={startEditing}>확인</Button>
            </form>
          ) : (
            <Button onClick={startEditing}>편집</Button>
          )}
        </>
      )}
    </>
  );
}

export default AwardEditForm;
