import React, { useState } from "react";
import CareerCard from "./CareerCard";
import CareerEditForm from "./CareerEditForm";

/** 편집 상태에 따라 편집 화면을 보여줄지 프로젝트 내용을 보여줄지 판단하는 컴포넌트 입니다.
 *
 * @returns CareerEditForm or CareerCard
 */
function Career({ career, setCareerList }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <CareerEditForm
          career={career}
          setCareerList={setCareerList}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CareerCard
          career={career}
          setCareerList={setCareerList}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}

export default Career;
