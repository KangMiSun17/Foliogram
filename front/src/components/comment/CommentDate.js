import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toObjectDate, toStringDate } from "../common/DateUtil";

function CommentDate({ comment }) {
  const [hour, setHour] = useState(
    Number(comment.createdAt.split("T")[1].split(".")[0].split(":")[0]) + 9
  );

  useEffect(() => {
    if (24 <= hour) {
      return setHour((cur) => "0" + String(cur - 24));
    }
  }, []);
  const minute = comment.createdAt.split("T")[1].split(".")[0].split(":")[1];

  return (
    <Row style={{ color: "gray" }}>
      <Col className="ms-4 mb-2 p-0">
        {toStringDate(toObjectDate(comment.createdAt))} {hour} : {minute}
      </Col>
    </Row>
  );
}
export default CommentDate;
