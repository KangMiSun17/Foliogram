import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import CareerAddForm from "./CareerAddForm";
import Career from "./Career";
import {
  OwnerContext,
  CareerFetchContext,
  CareerContext,
} from "../common/context/Context";
import * as Api from "../../api";

function Careers() {
  const { isEditable, portfolioOwnerId } = useContext(OwnerContext);
  const [career, setCareer] = useState([]);
  const [reFetching, setReFetching] = useState(new Date());

  useEffect(() => {
    try {
      const getCareerList = async () => {
        const res = await Api.get("careerlist/" + portfolioOwnerId);
        setCareer(res.data);
      };

      getCareerList();
    } catch (err) {
      console.log("Error: careerlist get request fail", err);
    }
  }, [reFetching, portfolioOwnerId]);

  return (
    <Card className="me-4 mt-3 mb-3">
      <Card.Body>
        <Card.Title className="mb-3">경력</Card.Title>
        <CareerFetchContext.Provider value={{ reFetching, setReFetching }}>
          <Card.Body>
            {career.map((career) => (
              <CareerContext.Provider key={career.id} value={career}>
                <Career />
              </CareerContext.Provider>
            ))}
          </Card.Body>
          {isEditable && <CareerAddForm />}
        </CareerFetchContext.Provider>
      </Card.Body>
    </Card>
  );
}

export default Careers;
