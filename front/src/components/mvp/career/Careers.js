import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import CareerAddForm from "./CareerAddForm";
import Career from "./Career";
import { OwnerContext } from "../../common/context/Context";
import * as Api from "../../../api";

function Careers() {
  const { isEditable, portfolioOwnerId } = useContext(OwnerContext);
  const [careerList, setCareerList] = useState([]);

  useEffect(() => {
    try {
      const getCareerList = async () => {
        const res = await Api.get("careerlist/" + portfolioOwnerId);
        setCareerList(res.data);
      };

      getCareerList();
    } catch (err) {
      console.log("Error: careerlist get request fail", err);
    }
  }, [portfolioOwnerId]);

  return (
    <Card className="me-4 mt-3 mb-3">
      <Card.Body>
        <Card.Title className="mb-3">경력</Card.Title>
        <Card.Body>
          {careerList.map((career, index) => (
            <Career
              key={career.id}
              career={{ data: career, index }}
              setCareerList={setCareerList}
            />
          ))}
        </Card.Body>
        {isEditable && <CareerAddForm setCareerList={setCareerList} />}
      </Card.Body>
    </Card>
  );
}

export default Careers;
