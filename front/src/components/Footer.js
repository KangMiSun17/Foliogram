import { Col, Row } from "react-bootstrap";

function Footer() {
  return (
    <footer
      className="mt-5"
      style={{
        width: "99%",
        position: "relative",
      }}
    >
      <Row
        style={{
          padding: "16px 20px 15px",
          borderTop: "1px solid #C4C4C4",
          height: "200px",
        }}
      >
        <Col>
          <h1>Foliogram</h1>
          <p style={{ color: "#7D7D7D" }}>
            5팀 개발바닥
            <br />
            우수팀 가즈아
          </p>
        </Col>
        <Col></Col>
      </Row>
      <Row
        className="align-items-center"
        style={{ background: "#EAEAEA", color: "#9F9F9F", height: "50px" }}
      >
        <Col className="ms-3">COPYRIGHT (C) 개발바닥 ALL RIGHTS RESERVED.</Col>
        <Col sm={2}>서울시 개발구 개발동</Col>
      </Row>
    </footer>
  );
}

export default Footer;
