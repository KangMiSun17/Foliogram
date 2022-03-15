import React, { useState } from "react";
import { Button } from "@mui/material";

/**
 * 수상 이력 추가 컴포넌트입니다.
 *
 * @param {boolean} isEditable - 편집 가능 여부
 *
 */
function AwardAddForm({ awards }) {
  const [isEditing, setIsEditing] = useState(false);
  const [award, setAward] = useState("");

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
            <label>
              상 이름:
              <input
                type="text"
                name="name"
                value={award}
                onChange={(e) => setAward(e.target.value)}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </>
  );
}

export default AwardAddForm;
