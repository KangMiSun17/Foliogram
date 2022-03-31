import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { validateEmail, validatePassword } from "../common/validateUtil";
import * as Api from "../../api";
import { UserContext } from "../common/context/UserContext";

function LoginForm() {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = validatePassword(password);
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("user/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      console.log("errMessage", err);
      alert("로그인에 실패하셨습니다. 이메일이나 비밀번호를 확인해주세요.");
    }
  };

  return (
    <StyleDiv>
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="loginEmail">
                <Form.Label>이메일 주소</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="on"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailValid && (
                  <Form.Text className="text-success">
                    이메일 형식이 올바르지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="loginPassword" className="mt-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="on"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isPasswordValid && (
                  <Form.Text className="text-success">
                    비밀번호는 8자리 이상 특수문자, 영어, 숫자로 설정해 주세요.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isFormValid}
                  >
                    로그인
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="light" onClick={() => navigate("/register")}>
                    회원가입하기
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </StyleDiv>
  );
}

export const StyleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 80vh;

  background-image: url(./dogpaw.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
`;

export default LoginForm;
