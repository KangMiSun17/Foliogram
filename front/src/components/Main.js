import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainDiv, StyledLogo } from "./common/Style";
import { UserContext } from "./common/context/UserContext";

function Main() {
  const navigate = useNavigate();
  const { userState } = useContext(UserContext);

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

export default Main;
