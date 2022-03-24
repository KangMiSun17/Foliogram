import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";
import Category from "./Category";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  //selected category
  const [category, setCategory] = useState("all");

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => {
      setUsers(res.data);
    });
  }, [userState, navigate]);

  return (
    <Container fluid>
      <Category setCategory={setCategory} />
      {category === "all" && (
        <Row xs="auto">
          {users.map((user) => (
            <Col sm={2} key={user.id}>
              <UserCard user={user} isNetwork />
            </Col>
          ))}
        </Row>
      )}
      {category === "developer" && (
        <Row xs="auto">
          {users.map((user) => {
            if (user.user_category === "개발자") {
              return (
                <Col sm={2} key={user.id}>
                  <UserCard user={user} isNetwork />
                </Col>
              );
            }
          })}
        </Row>
      )}
      {category === "artist" && (
        <Row xs="auto">
          {users.map((user) => {
            if (user.user_category === "예술가") {
              return (
                <Col sm={2} key={user.id}>
                  <UserCard user={user} isNetwork />
                </Col>
              );
            }
          })}
        </Row>
      )}
      {category === "mafia" && (
        <Row xs="auto">
          {users.map((user) => {
            if (user.user_category === "마피아") {
              return (
                <Col sm={2} key={user.id}>
                  <UserCard user={user} isNetwork />
                </Col>
              );
            }
          })}
        </Row>
      )}
    </Container>
  );
}

export default Network;
