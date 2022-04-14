import Styled from "styled-components";

/**
 * Header에서 사용하는 스타일 입니다.
 */
export const StyleDiv = Styled.div`
  border-bottom: 1px solid #c4c4c4;
  padding: 10px 30px;
  margin: 0 10px 30px;
  // background-image: url(./Logo1.png);
  // background-size: 220px;
  // background-repeat: no-repeat;
  // background-position-x: center;
  // background-position-y: center;
`;

export const alignVertical = {
  paddingTop: "20px",
  paddingBottom: "20px",
};

export const logoPosition = {
  position: "absolute",
  top: "14px",
  left: "50%",
  transform: "translateX(-43%)",
};

/**
 * Main에서 사용하는 스타일 입니다.
 */
export const MainDiv = Styled.div`
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

export const StyledLogo = Styled.div`
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

/**
 * LoginForm 및 RegisterForm에서 사용하는 스타일 입니다.
 */
export const LoginStyleDiv = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 80vh;

  background-image: url(/dogpaw.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
`;

/**
 * UserCard에서 사용하는 스타일 입니다.
 */

export const linkStyle = {
  color: "black",
  display: "block",
  textAlign: "center",
  width: "100px",
  textDecoration: "none",
  margin: "10px auto",
  cursor: "pointer",
};
