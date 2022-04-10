import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { StyleDiv, alignVertical, logoPosition } from "./common/Style";
import { UserContext } from "./common/context/UserContext";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userState, dispatch } = useContext(UserContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <StyleDiv>
      <Nav activeKey={location.pathname}>
        <Nav.Item style={alignVertical} className="me-auto">
          <Nav.Link disabled>
            폴리오그램은 포트폴리오 공유 서비스입니다.
          </Nav.Link>
        </Nav.Item>

        <Nav.Item style={logoPosition}>
          <Nav.Link onClick={() => navigate("/network")}>
            <Image
              src="/logo.svg"
              style={{ width: "200px", margin: "auto" }}
            ></Image>
          </Nav.Link>
        </Nav.Item>
        {isLogin && (
          <>
            <Nav.Item style={alignVertical} className="ms-auto">
              <Nav.Link
                style={{ color: "#303B4B" }}
                onClick={() => navigate("/users/" + userState.user.id)}
              >
                나의 페이지
              </Nav.Link>
            </Nav.Item>

            <Nav.Item style={alignVertical}>
              <Nav.Link
                style={{ color: "#303B4B" }}
                onClick={() => navigate("/users/follows")}
              >
                팔로우 목록
              </Nav.Link>
            </Nav.Item>

            <Nav.Item style={alignVertical}>
              <Nav.Link
                style={{ color: "#303B4B" }}
                onClick={() => navigate("/network")}
              >
                네트워크
              </Nav.Link>
            </Nav.Item>

            <Nav.Item style={alignVertical}>
              <Nav.Link style={{ color: "#303B4B" }} onClick={logout}>
                로그아웃
              </Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </StyleDiv>
  );
}

export default Header;
