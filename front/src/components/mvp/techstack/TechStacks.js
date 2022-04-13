import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import TechStackAddForm from "./TechStackAddForm";
import TechStack from "./TechStack";
import { OwnerContext } from "../common/context/Context";
import * as Api from "../../api";

function Projects() {
  const { isEditable, portfolioOwnerId } = useContext(OwnerContext);
  const [techStackList, setTechStackList] = useState([]);

  useEffect(() => {
    try {
      const getTechStacksList = async () => {
        const res = await Api.get("techstacklist/" + portfolioOwnerId);
        setTechStackList(res.data);
      };

      getTechStacksList();
    } catch (err) {
      console.log("Error: TechStacklist get request fail", err);
    }
  }, [portfolioOwnerId]);

  return (
    <Card className="me-4 mt-3 mb-3">
      <Card.Body>
        <Card.Title className="mb-3">기술스택</Card.Title>
        <Card.Body>
          {techStackList.map((techStack, index) => (
            <TechStack
              key={techStack.id}
              techStack={{ data: techStack, index }}
              setTechStackList={setTechStackList}
            />
          ))}
        </Card.Body>
        {isEditable && <TechStackAddForm setTechStackList={setTechStackList} />}
      </Card.Body>
    </Card>
  );
}

export default Projects;
