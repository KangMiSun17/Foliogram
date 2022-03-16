import React, { useState, useEffect } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Awards({ isEditable }) {
  const [awards, setAwards] = useState([
    {
      content: "개근상",
      id: 0,
    },
    {
      content: "상상",
      id: 1,
    },
  ]);
  return (
    <div>
      {awards.map((award) => (
        <>
          <AwardCard award={award.content} />
          <AwardEditForm
            award={award.content}
            id={award.id}
            isEditable={isEditable}
            setAwards={setAwards}
          />
        </>
      ))}
    </div>
  );
}

export default Awards;
