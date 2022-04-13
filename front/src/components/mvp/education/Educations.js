import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import EducationAddForm from "./EducationAddForm";
import Education from "./Education";
import { OwnerContext } from "../common/context/Context";
import * as Api from "../../api";

/** Education list and Education add component
 *
 * @returns Education or EducationAddForm
 */
function Educations() {
  const { isEditable, portfolioOwnerId } = useContext(OwnerContext);
  const [educationList, setEducationList] = useState([]);

  useEffect(() => {
    try {
      const getEducationList = async () => {
        const res = await Api.get("educationlist/" + portfolioOwnerId);
        setEducationList(res.data);
      };

      getEducationList();
    } catch (err) {
      console.log("Error: getEducationlist get request fail", err);
    }
  }, [portfolioOwnerId]);

  return (
    <Card className="me-4 mb-3">
      <Card.Body>
        <Card.Title className="mb-3">학력</Card.Title>
        <Card.Body>
          {educationList.map((education, index) => (
            <Education
              key={education.id}
              education={{ data: education, index }}
              setEducationList={setEducationList}
            />
          ))}
        </Card.Body>
        {isEditable && <EducationAddForm setEducationList={setEducationList} />}
      </Card.Body>
    </Card>
  );
}

export default Educations;
