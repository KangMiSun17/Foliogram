import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../App";
import styled from "styled-components";

function Main() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  useEffect(() => {
    if (userState.user) {
      navigate("/network");
      return;
    }
  });

  return (
    <>
      <MainDiv>
        <img className="mt-5 mb-4" src="/MainTitle.png" alt="img" width="40%" />

        <div style={{ textAlign: "center" }}>
          <img
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", marginRight: "4rem" }}
            src="/MainLogin.png"
            alt="img"
            width="7%"
          />
          <img
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer" }}
            src="/MainRegister.png"
            alt="img"
            width="10%"
          />
        </div>
      </MainDiv>

      <StyledLogo>
        {/* <img src="/MainSubTitle.png" alt="img" width="20%" /> */}
      </StyledLogo>
    </>
  );
}

export const MainDiv = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;

  height: 80vh;

  background-image: url(/MainBackGround.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
`;

const StyledLogo = styled.div`
  // display: absolute;

  // justify-content: center;
  // align-items: center;
  // flex-flow: column;

  height: 10vh;
  margin-top: -10vh;

  // display: block
  // height: 100px;
  top: 50%;
  left: 50%;
  transform: "translate(-50%, -50%)";
  background-image: url(/MainSubTitle.png);
  background-size: 10%;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
`;
export default Main;
