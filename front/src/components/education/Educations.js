import React, { useState, useEffect } from "react";
import EducationEditForm from "./EducationEditForm";
import EducationCard from "./EducationCard";
import Card from "react-bootstrap/Card";

function Educations({ title, desc, isEditable }) {
  const [isEditding, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      {isEditding ? (
        <EducationEditForm></EducationEditForm>
      ) : (
        <EducationCard
          title={title}
          desc={desc}
          isEditable={isEditable}
          setEditding={setIsEditing}
        ></EducationCard>
      )}
    </>
  );
}

export default Educations;
