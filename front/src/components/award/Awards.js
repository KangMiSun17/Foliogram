import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import Award from "./Award";
import {
  EditTableContext,
  PortfolioOwnerContext,
  AwardFetchContext,
  AwardContext,
} from "../common/context/Context";
import * as Api from "../../api";

/** Award list and award add component
 *
 * @returns Award or AwardAddForm
 */
function Awards() {
  //editable
  const isEditable = useContext(EditTableContext);
  const portfolioOwnerId = useContext(PortfolioOwnerContext);
  //award list object
  const [awards, setAwards] = useState([]);
  //to re-render
  const [reFetching, setReFetching] = useState(new Date());

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
  }, [portfolioOwnerId, reFetching]);

  return (
    <AwardFetchContext.Provider value={setReFetching}>
      <Card className="me-4 mt-3">
        <Card.Body>
          <Card.Title className="mb-3">수상 이력</Card.Title>
          <Card.Body>
            {awards.map((award) => (
              <AwardContext.Provider key={award.id} value={award}>
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
