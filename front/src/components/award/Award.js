import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

/** If editing, show AwardEditForm, otherwise show AwardCard.
 *
 * @returns AwardEditForm or AwardCard
 */
function Award() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm setIsEditing={setIsEditing} />
      ) : (
        <AwardCard setIsEditing={setIsEditing} />
      )}
    </>
  );
}

export default Award;
