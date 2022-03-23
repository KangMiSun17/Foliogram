import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <Container fluid>
      <DropdownButton
        id="dropdown-variants-Secondary"
        variant="secondary"
        title="카테고리 선택"
        className="mb-3"
      >
        <Dropdown.Item href="#/action-1">개발자</Dropdown.Item>
        <Dropdown.Item href="#/action-2">예술가</Dropdown.Item>
        <Dropdown.Item href="#/action-3">마피아</Dropdown.Item>
      </DropdownButton>
      <Row xs="auto" className="jusify-content-center">
        {users.map((user) => (
          <Col sm={2}>
            <UserCard key={user.id} user={user} isNetwork />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Network;
