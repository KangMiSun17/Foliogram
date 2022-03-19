import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

/** 편집 상태에 따라 편집 화면을 보여줄지 수상 내용을 보여줄지 판단하는 컴포넌트 입니다.
 *
 * @returns ProjectEditForm or ProjectCard
 */
function Education() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <EducationEditForm setIsEditing={setIsEditing} />
      ) : (
        <EducationCard setIsEditing={setIsEditing} />
      )}
    </div>
  );
}

export default Education;
