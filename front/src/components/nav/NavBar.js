import React, { useState } from "react";
import { Stack, Dropdown, Button } from "react-bootstrap";
import styled from "styled-components";

function NavBar({ navList, setNavList, setTogglePage }) {
  const [pickSameName, setPickSameName] = useState("");

  ///@ to make addBtn List
  function addHandleNav(e) {
    const name = e.target.name;

    navList.map((compAr, index, array) => {
      if (compAr.navName === name) {
        compAr.state = true;
        array.splice(index, 1, compAr);
      }
      //just added this return like that because eslint bordered me
      return null;
    });

    const newArray = [...navList];
    setNavList(newArray);
  }

  ///@ to make delBtn List
  function delHandleNav(e) {
    const name = e.target.name;

    navList.map((compAr, index, array) => {
      if (compAr.navName === name) {
        compAr.state = false;
        compAr.show = false;
        array.splice(index, 1, compAr);
      }
      //just added this return like that because eslint bordered me
      return null;
    });

    const newArray = [...navList];
    setNavList(newArray);
  }

  function handleNavBtn(e) {
    const name = e.target.name;

    // 한번 더 누르면 전체보기로 변하는 로직
    if (pickSameName === "") {
      setTogglePage(false);
      setPickSameName(name);
    } else if (pickSameName !== name) {
      setTogglePage(false);
      setPickSameName(name);
    } else if (pickSameName === name) {
      setTogglePage((cur) => !cur);
      setPickSameName(name);
    }

    //한페이지만 보여주는 로직
    navList.map((compAr, index, array) => {
      if (compAr.navName === name) {
        compAr.show = true;
        array.splice(index, 1, compAr);
      } else {
        compAr.show = false;
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
            return (
              <Button
                variant="none"
                style={{
                  paddingLeft: 30,
                  paddingRight: 30,
                  fontSize: 18,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                key={index}
                name={compAr.navName}
                onClick={handleNavBtn}
              >
                {compAr.navName}
              </Button>
            );
          }
          //just added this return like that because eslint bordered me
          return null;
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
              //just added this return like that because eslint bordered me
              return null;
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
                    compAr={compAr}
                    key={index}
                    name={compAr.navName}
                    onClick={delHandleNav}
                  >
                    {compAr.navName}
                  </Dropdown.Item>
                );
              }
              //just added this return like that because eslint bordered me
              return null;
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
// let StyledDiv = styled.div`
//   font-size: 22px;
//   font-weight: 500;

//   cursor: pointer;
// `;

export default NavBar;
