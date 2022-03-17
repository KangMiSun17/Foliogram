import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

/** 편집 상태에 따라 편집 화면을 보여줄지 수상 내용을 보여줄지 판단하는 컴포넌트 입니다.
 *
 * @param {boolean} isEditable - 편집 가능 여부
 * @param {object} award - award.map으로 넘어온 각각의 award
 * @param {function} editHandler - Awards update function
 * @returns AwardEditForm or AwardCard
 */
function Awards({ isEditable, award, setLastCall }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <AwardEditForm
          award={award}
          setIsEditing={setIsEditing}
          id={award.id}
          setLastCall={setLastCall}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}

export default Awards;
