import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import { validatePassword } from "../common/validateUtil";
import * as Api from "../../api";
import { BundleButton } from "../common/Button";

function UserEditForm({ user, setIsEditing, setUser }) {
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [userEdit, setUserEdit] = useState({
    name: user.name,
    description: user.description,
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [user_category, setUserCategory] = useState(user.user_category);

  const isPasswordValid = validatePassword(userEdit.newPassword);
  const isPasswordSame = userEdit.newPassword === userEdit.confirmPassword;
  const isFormValid = userEdit.password && isPasswordValid && isPasswordSame;

  const onChangeHandler = (e) => {
    setUserEdit((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    try {
      const res = await Api.put(`users/${user.id}`, {
        name: userEdit.name,
        user_category,
        description: userEdit.description,
      });

      // 유저 정보는 response의 data임.
      const updatedUser = res.data;
      // 해당 유저 정보로 user을 세팅함.
      setUser(updatedUser);
    } catch (err) {
      console.log("유저 정보 변경 실패", err);
    }

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`users/${user.id}/password`, {
        password: userEdit.password,
        passwordReset: userEdit.newPassword,
      });

      // 유저 정보는 response의 data임.
      const updatedUser = res.data;
      // 해당 유저 정보로 user을 세팅함.
      setUser(updatedUser);
      setUserEdit((prev) => ({
        ...prev,
        password: "",
        newPassword: "",
        confirmPassword: "",
      }));

      alert("비밀번호가 변경되었습니다.");
    } catch (err) {
      alert(`비밀번호 변경 실패 ${err.response.data.errorMessage}`);
      return;
    }

    // isEditing을 false로 세팅함.
    setIsEditPassword(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form>
          {isEditPassword ? (
            <Form.Group className="mb-3">
              <Form.Label>비밀번호 변경</Form.Label>
              <Form.Control
                className="mb-2"
                type="password"
                id="password"
                placeholder="기존 비밀번호"
                value={userEdit.password}
                onChange={onChangeHandler}
              />
              <Form.Control
                type="password"
                id="newPassword"
                placeholder="새 비밀번호"
                value={userEdit.newPassword}
                onChange={onChangeHandler}
              />
              {!isPasswordValid && (
                <Form.Text>
                  비밀번호는 8자리 이상 특수문자, 영어, 숫자로 설정해 주세요.
                </Form.Text>
              )}
              <Form.Control
                className="mb-2"
                type="password"
                id="confirmPassword"
                placeholder="새 비밀번호 확인"
                value={userEdit.confirmPassword}
                onChange={onChangeHandler}
              />
              {!isPasswordSame && (
                <Form.Text>비밀번호가 일치하지 않습니다.</Form.Text>
              )}
              <Row className="justify-content-center" xs="auto">
                <Button
                  className="me-3"
                  variant="primary"
                  type="submit"
                  onClick={handlePasswordSubmit}
                  disabled={!isFormValid}
                >
                  확인
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    setIsEditPassword(false);
                  }}
                >
                  취소
                </Button>
              </Row>
            </Form.Group>
          ) : (
            <>
              <Form.Label>이메일 : {user.email}</Form.Label>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>이름</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="닉네임"
                  value={userEdit.name}
                  onChange={(e) =>
                    setUserEdit((prev) => ({
                      ...prev,
                      [e.target.id]: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group controlId="userEditEmail" className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  defaultValue={user_category}
                  onChange={(e) => setUserCategory(e.target.value)}
                >
                  <option value="">카테고리를 설정해주세요</option>
                  <option value="개발자">개발자</option>
                  <option value="예술가">예술가</option>
                  <option value="마피아">마피아</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="description" className="mb-3">
                <Form.Label>설명</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="정보, 인사말"
                  value={userEdit.description}
                  onChange={(e) =>
                    setUserEdit((prev) => ({
                      ...prev,
                      [e.target.id]: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Button
                type="button"
                variant="primary"
                onClick={() => setIsEditPassword((cur) => !cur)}
              >
                비밀번호 변경하기
              </Button>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <BundleButton
                    submitHandler={handleSubmit}
                    setState={setIsEditing}
                  />
                </Col>
              </Form.Group>
            </>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
