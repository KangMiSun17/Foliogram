import React, { useContext, useState, useEffect } from "react";
import { Stack, Dropdown } from "react-bootstrap";
import styled from "styled-components";

function NavBar() {
  return (
    <>
      <Stack direction="horizontal" gap={2} className="ms-2 me-4 mb-3">
        <StyledDiv>학력</StyledDiv>
        <StyledDiv>수상이력</StyledDiv>
        <StyledDiv>프로젝트</StyledDiv>
        <StyledDiv>자격증</StyledDiv>
        <StyledDiv>경력</StyledDiv>
        <StyledDiv>기술스텍</StyledDiv>

        <Dropdown className="ms-auto">
          <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
            +
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
            -
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Stack>
    </>
  );
}

//styled-components
let StyledDiv = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding: 0 2rem;
  cursor: pointer;
`;

export default NavBar;
