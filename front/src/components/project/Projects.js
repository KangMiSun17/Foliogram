import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import ProjectAddForm from "./ProjectAddForm";
import Project from "./Project";
import {
  OwnerContext,
  ProjectFetchContext,
  ProjectContext,
} from "../common/context/Context";
import * as Api from "../../api";

function Projects() {
  const { isEditable, portfolioOwnerId } = useContext(OwnerContext);
  const [projects, setProjects] = useState([]);
  const [reFetching, setReFetching] = useState(new Date());

  useEffect(() => {
    try {
      const getProjectList = async () => {
        const res = await Api.get("projectlist/" + portfolioOwnerId);
        setProjects(res.data);
      };

      getProjectList();
    } catch (err) {
      console.log("Error: projectlist get request fail", err);
    }
  }, [reFetching, portfolioOwnerId]);

  return (
    <Card className="me-4 mt-3 mb-3">
      <Card.Body>
        <Card.Title className="mb-3">프로젝트</Card.Title>
        <ProjectFetchContext.Provider value={{ reFetching, setReFetching }}>
          <Card.Body>
            {projects.map((project) => (
              <ProjectContext.Provider key={project.id} value={project}>
                <Project />
              </ProjectContext.Provider>
            ))}
          </Card.Body>
          {isEditable && <ProjectAddForm />}
        </ProjectFetchContext.Provider>
      </Card.Body>
    </Card>
  );
}

export default Projects;
