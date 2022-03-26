import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { validateEmail, validatePassword } from "../common/validateUtil";
import { StyleDiv } from "./LoginForm";
import * as Api from "../../api";

function RegisterForm() {
  const navigate = useNavigate();
  const [addUser, setAddUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(addUser.email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = validatePassword(addUser.password);
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = addUser.password === addUser.confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = addUser.name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleOnChange = (e) => {
    setAddUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        email: addUser.email,
        password: addUser.password,
        name: addUser.name,
      });

      alert("이메일이 전송되었습니다. 이메일을 확인해주세요.");
      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  return (
    <StyleDiv>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col lg={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="registerEmail">
                <Form.Label>이메일 주소</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={addUser.email}
                  onChange={handleOnChange}
                />
                {!isEmailValid && (
                  <Form.Text className="text-success">
                    이메일 형식이 올바르지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerPassword" className="mt-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  autoComplete="off"
                  value={addUser.password}
                  onChange={handleOnChange}
                />
                {!isPasswordValid && (
                  <Form.Text className="text-success">
                    비밀번호는 8자리 이상 특수문자, 영어, 숫자로 설정해 주세요.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerConfirmPassword" className="mt-3">
                <Form.Label>비밀번호 재확인</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  autoComplete="off"
                  value={addUser.confirmPassword}
                  onChange={handleOnChange}
                />
                {!isPasswordSame && (
                  <Form.Text className="text-success">
                    비밀번호가 일치하지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerName" className="mt-3">
                <Form.Label>이름</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={addUser.name}
                  onChange={handleOnChange}
                />
                {!isNameValid && (
                  <Form.Text className="text-success">
                    이름은 2글자 이상으로 설정해 주세요.
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
                    회원가입
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="light" onClick={() => navigate("/login")}>
                    로그인하기
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

export default RegisterForm;
