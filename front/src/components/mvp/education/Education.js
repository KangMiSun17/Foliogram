import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

/** 편집 상태에 따라 편집 화면을 보여줄지 학력 카드 내용을 보여줄지 판단하는 컴포넌트 입니다.
 *
 * @returns EducationEditForm or EducationCard
 */
function Education({ education, setEducationList }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <EducationEditForm
          setIsEditing={setIsEditing}
          education={education}
          setEducationList={setEducationList}
        />
      ) : (
        <EducationCard
          setIsEditing={setIsEditing}
          education={education}
          setEducationList={setEducationList}
        />
      )}
    </div>
  );
}

export default Education;
