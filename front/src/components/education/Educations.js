import React, { useState, useEffect } from "react";
import EducationEditForm from "./EducationEditForm";
import EducationCard from "./EducationCard";

function Educations({ val, eduList, setEduList, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          val={val}
          eduList={eduList}
          setEduList={setEduList}
          setIsEditing={setIsEditing}
        ></EducationEditForm>
      ) : (
        <EducationCard
          val={val}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        ></EducationCard>
      )}
    </>
  );
}

export default Educations;
