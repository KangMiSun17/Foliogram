import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

/**
 * 수상 이력 추가 컴포넌트입니다.
 *
 * @param {boolean} isEditable - 편집 가능 여부
 *
 */
function AwardAddForm() {
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    setIsEditing((cur) => !cur);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing((cur) => !cur);
  };
  return (
    <>
      {!isEditing ? (
        <Button
          sx={{
            display: "inline",
            border: 1,
          }}
          size="small"
          onClick={startEditing}
        >
          추가
        </Button>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              id="standard-multiline-flexible"
              label="Multiline"
              multiline
              maxRows={4}
              variant="standard"
            />
            <Button type="submit" variant="outlined">
              확인
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

export default AwardAddForm;
