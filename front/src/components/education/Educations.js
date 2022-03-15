import React, { useState, useEffect } from "react";
import EducationEditForm from "./EducationEditForm";
import EducationCard from "./EducationCard";

function Educations(isEditable) {
  const [isEditding, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      {isEditding ? (
        <EducationEditForm></EducationEditForm>
      ) : (
        <EducationCard></EducationCard>
      )}
    </>
  );
}

export default Educations;
