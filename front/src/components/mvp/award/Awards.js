import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import Award from "./Award";
import { OwnerContext } from "../../common/context/Context";
import * as Api from "../../../api";

/** Award list and award add component
 *
 * @returns Award or AwardAddForm
 */
function Awards() {
  //editable
  const { isEditable, portfolioOwnerId } = useContext(OwnerContext);
  //award list object
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    try {
      const getAwardList = async () => {
        const res = await Api.get(`awardlist`, portfolioOwnerId);
        setAwards(res.data);
      };
      getAwardList();
    } catch (err) {
      console.log("Error: award list get request fail", err);
    }
  }, [portfolioOwnerId]);

  return (
    <Card className="me-4 mt-3 mb-3">
      <Card.Body>
        <Card.Title className="mb-3">수상 이력</Card.Title>
        <Card.Body>
          {awards.map((award, index) => (
            <Award
              key={award.id}
              award={{ data: award, index }}
              setAwards={setAwards}
            />
          ))}
        </Card.Body>
        {isEditable && <AwardAddForm setAwards={setAwards} />}
      </Card.Body>
    </Card>
  );
}

export default Awards;
