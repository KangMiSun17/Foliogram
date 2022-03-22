import React, { useContext, useState, useEffect } from "react";
import { Stack, Dropdown } from "react-bootstrap";
import styled from "styled-components";

function NavBar({ navList, setNavList }) {
  function addHandleNav(e) {
    const name = e.target.name;

    navList.map((compAr, index, array) => {
      if (compAr.navName === name) {
        compAr.state = true;
        array.splice(index, 1, compAr);
      }
    });

    const newArray = [...navList];
    setNavList(newArray);
  }

  function delHandleNav(e) {
    const name = e.target.name;

    navList.map((compAr, index, array) => {
      if (compAr.navName === name) {
        compAr.state = false;
        array.splice(index, 1, compAr);
      }
    });

    const newArray = [...navList];
    setNavList(newArray);
  }

  return (
    <>
      <Stack direction="horizontal" gap={2} className="ms-1 me-1 mb-3">
        {navList.map((compAr, index) => {
          if (compAr.state === true) {
            return <StyledDiv key={index}>{compAr.navName}</StyledDiv>;
          }
        })}

        <Dropdown className="ms-auto">
          <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
            추가+
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {navList.map((compAr, index) => {
              if (compAr.state === false) {
                return (
                  <Dropdown.Item
                    key={index}
                    name={compAr.navName}
                    onClick={addHandleNav}
                  >
                    {compAr.navName}
                  </Dropdown.Item>
                );
              }
            })}
            {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown style={{ marginRight: 20 }}>
          <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
            삭제-
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {navList.map((compAr, index) => {
              if (compAr.state === true) {
                return (
                  <Dropdown.Item
                    key={index}
                    name={compAr.navName}
                    onClick={delHandleNav}
                  >
                    {compAr.navName}
                  </Dropdown.Item>
                );
              }
            })}
            {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
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
