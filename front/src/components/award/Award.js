import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

/** If editing, show AwardEditForm, otherwise show AwardCard.
 *
 * @returns AwardEditForm or AwardCard
 */
function Award({ award, setAwards }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          setIsEditing={setIsEditing}
          award={award}
          setAwards={setAwards}
        />
      ) : (
        <AwardCard
          setIsEditing={setIsEditing}
          award={award}
          setAwards={setAwards}
        />
      )}
    </>
  );
}

export default Award;
