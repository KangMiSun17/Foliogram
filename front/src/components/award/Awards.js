import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import Award from "./Award";
import {
  AwardFetchContext,
  AwardContext,
  User1Context,
} from "../common/context/Context";
import * as Api from "../../api";

/** Award list and award add component
 *
 * @returns Award or AwardAddForm
 */
function Awards() {
  //editable
  const { isEditable, portfolioOwnerId } = useContext(User1Context);
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
    <AwardFetchContext.Provider value={setAwards}>
      <Card className="me-4 mt-3">
        <Card.Body>
          <Card.Title className="mb-3">수상 이력</Card.Title>
          <Card.Body>
            {awards.map((award, index) => (
              <AwardContext.Provider key={award.id} value={{ award, index }}>
                <Award />
              </AwardContext.Provider>
            ))}
          </Card.Body>
          {isEditable && <AwardAddForm />}
        </Card.Body>
      </Card>
    </AwardFetchContext.Provider>
  );
}

export default Awards;
