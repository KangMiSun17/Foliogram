import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import TechStackAddForm from "./TechStackAddForm";
import TechStack from "./TechStack";
import {
  User1Context,
  TechStackFetchContext,
  TechStackContext,
} from "../common/context/Context";
import * as Api from "../../api";

function Projects() {
  const { isEditable, portfolioOwnerId } = useContext(User1Context);
  const [techStacks, setTechStacks] = useState([]);
  const [reFetching, setReFetching] = useState(new Date());

  useEffect(() => {
    try {
      const getTechStacksList = async () => {
        const res = await Api.get("techstacklist/" + portfolioOwnerId);
        setTechStacks(res.data);
      };

      getTechStacksList();
    } catch (err) {
      console.log("Error: TechStacklist get request fail", err);
    }
  }, [reFetching, portfolioOwnerId]);

  return (
    <Card className="me-4 mt-3 mb-3">
      <Card.Body>
        <Card.Title className="mb-3">기술스택</Card.Title>
        <TechStackFetchContext.Provider value={{ reFetching, setReFetching }}>
          <Card.Body>
            {techStacks.map((Tech) => (
              <TechStackContext.Provider key={Tech.id} value={Tech}>
                <TechStack />
              </TechStackContext.Provider>
            ))}
          </Card.Body>
          {isEditable && <TechStackAddForm />}
        </TechStackFetchContext.Provider>
      </Card.Body>
    </Card>
  );
}

export default Projects;
