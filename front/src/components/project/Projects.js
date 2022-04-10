import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import ProjectAddForm from "./ProjectAddForm";
import Project from "./Project";
import { OwnerContext } from "../common/context/Context";
import * as Api from "../../api";

function Projects() {
  const { isEditable, portfolioOwnerId } = useContext(OwnerContext);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    try {
      const getProjectList = async () => {
        const res = await Api.get("projectlist/" + portfolioOwnerId);
        setProjectList(res.data);
      };

      getProjectList();
    } catch (err) {
      console.log("Error: projectlist get request fail", err);
    }
  }, [portfolioOwnerId]);

  return (
    <Card className="me-4 mt-3 mb-3">
      <Card.Body>
        <Card.Title className="mb-3">프로젝트</Card.Title>
        <Card.Body>
          {projectList.map((project, index) => (
            <Project
              key={project.id}
              project={{ data: project, index }}
              setProjectList={setProjectList}
            />
          ))}
        </Card.Body>
        {isEditable && <ProjectAddForm setProjectList={setProjectList} />}
      </Card.Body>
    </Card>
  );
}

export default Projects;
