import React, { useContext, useState } from "react";
import { Stack, Dropdown, Button } from "react-bootstrap";
import { OwnerContext } from "../common/context/Context";
import * as Api from "../../api";

function NavBar({ navList, setNavList, setTogglePage }) {
  const { portfolioOwnerId, isEditable } = useContext(OwnerContext);
  const [pickSameName, setPickSameName] = useState("");

  ///@ put addBtn request
  async function addHandleNavState(e) {
    const name = e.target.name;

    await Api.put(`users/${portfolioOwnerId}`, {
      user_mvp: { navName: name, state: true },
    });
  }

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

  ///@ put delBtn request
  async function delHandleNavState(e) {
    const name = e.target.name;

    await Api.put(`users/${portfolioOwnerId}`, {
      user_mvp: { navName: name, state: false },
    });
  }

  ///@ show all
  function handleShowAll(e) {
    setTogglePage(true);
    navList.map((compAr, index, array) => {
      compAr.show = false;
      array.splice(index, 1, compAr);
      return null;
    });
    const newArray = [...navList];
    setNavList(newArray);
  }

  ///@ to show only one page when users click each nav button
  function handleNavBtn(e) {
    const name = e.target.name;
    // ?????? ??? ????????? ??????????????? ????????? ??????
    if (pickSameName === "") {
      setTogglePage(false);
      setPickSameName(name);
    } else if (pickSameName !== name) {
      setTogglePage(false);
      setPickSameName(name);
    } else if (pickSameName === name) {
      // setTogglePage((cur) => !cur);
      // setPickSameName(name);
      setTogglePage(false);
    }

    //??????????????? ???????????? ??????
    navList.map((compAr, index, array) => {
      if (compAr.navName === name) {
        compAr.show = !compAr.show;
        array.splice(index, 1, compAr);
      } else {
        compAr.show = false;
        array.splice(index, 1, compAr);
      }
      return null;
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
                  paddingLeft: 20,
                  paddingRight: 20,
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

        {isEditable ? (
          <>
            <Button className="ms-auto" variant="light" onClick={handleShowAll}>
              ????????????
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                ?????? +
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {navList.map((compAr, index) => {
                  if (compAr.state === false) {
                    return (
                      <Dropdown.Item
                        key={index}
                        name={compAr.navName}
                        onClick={(e) => {
                          addHandleNavState(e);
                          addHandleNav(e);
                        }}
                      >
                        {compAr.navName}
                      </Dropdown.Item>
                    );
                  }
                  //just added this return like that because eslint bordered me
                  return null;
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown style={{ marginRight: 20 }}>
              <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                ?????? -
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {navList.map((compAr, index) => {
                  if (compAr.state === true) {
                    return (
                      <Dropdown.Item
                        key={index}
                        name={compAr.navName}
                        onClick={(e) => {
                          delHandleNavState(e);
                          delHandleNav(e);
                        }}
                      >
                        {compAr.navName}
                      </Dropdown.Item>
                    );
                  }
                  //just added this return like that because eslint bordered me
                  return null;
                })}
              </Dropdown.Menu>
            </Dropdown>
            {/* <Button style={{ marginRight: 20 }}>??????</Button> */}
          </>
        ) : (
          <>
            <Button className="ms-auto" variant="light" onClick={handleShowAll}>
              ????????????
            </Button>
            <div style={{ marginRight: "12px" }}></div>
          </>
        )}
      </Stack>
      {/* <Stack
        style={{ marginTop: "53px" }}
        direction="horizontal"
        gap={2}
      ></Stack> */}
    </>
  );
}

export default NavBar;
