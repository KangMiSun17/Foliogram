import React, { useState, useEffect } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Awards({ isEditable, award, editHandler }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <AwardEditForm
          award={award}
          setIsEditing={setIsEditing}
          editHandler={editHandler}
          id={award.id}
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
