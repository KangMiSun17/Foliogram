import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import EducationAddForm from "./EducationAddForm";
import Education from "./Education";
import {
  EditTableContext,
  PortfolioOwnerContext,
  EducationFetchContext,
  EducationContext,
} from "../common/context/Context";
import * as Api from "../../api";

function Educations() {
  const isEditable = useContext(EditTableContext);
  const portfolioOwnerId = useContext(PortfolioOwnerContext);
  const [educations, setEducations] = useState([]);
  const [reFetching, setReFetching] = useState(new Date());

  useEffect(() => {
    try {
      const getEducationList = async () => {
        const res = await Api.get("educationlist/" + portfolioOwnerId);
        // console.log(res.data);
        setEducations(res.data);
      };
      getEducationList();
    } catch (err) {
      console.log("Error: getEducationlist get request fail", err);
    }
  }, [reFetching, portfolioOwnerId]);

  return (
    <Card className="me-4 mt-3 mb-3">
      <Card.Body>
        <Card.Title className="mb-3">학력</Card.Title>
        <EducationFetchContext.Provider value={{ reFetching, setReFetching }}>
          <Card.Body>
            {educations.map((education) => (
              <EducationContext.Provider key={education.id} value={education}>
                <Education />
              </EducationContext.Provider>
            ))}
          </Card.Body>
          {isEditable && <EducationAddForm />}
        </EducationFetchContext.Provider>
      </Card.Body>
    </Card>
  );
}

export default Educations;
