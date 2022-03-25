import { Col, Row } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Row
        style={{
          padding: "10px 30px",
          margin: "0 10px 30px",
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
        style={{
          borderTop: "1px solid #C4C4C4",
          color: "#9F9F9F",
          height: "50px",
          padding: "10px 30px",
          margin: "0 10px 30px",
        }}
      >
        <Col>COPYRIGHT (C) 개발바닥 ALL RIGHTS RESERVED.</Col>
      </Row>
    </footer>
  );
}

export default Footer;
