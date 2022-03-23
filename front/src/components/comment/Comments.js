import React, { useContext, useState } from "react";
import { Card, Button, Form, Col, Row } from "react-bootstrap";
import { DeleteButton } from "../common/Button";
import { EditTableContext } from "../common/context/Context";

function Comments() {
  const addComment = () => {
    setComments((prev) => [...prev, { id: 3, user_id, description }]);
    setDescription("");
  };
  const isEditable = useContext(EditTableContext);
  const [comments, setComments] = useState([
    {
      id: 0,
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MDZfMTYy%2FMDAxNjMwOTM3MDU4MDgw.-bYmpsStGodab660NxssdUeF98U63vp8DYJZucAztbAg.gW3fXoKqe7X4sLKKeUHIrLb9WoK_qA43DgH7sJYENlMg.JPEG.kkaykim%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5_%252811%2529.jpg&type=sc960_832",
      user_id: "임꺽정",
      description: "너무 멋져요!",
    },
    {
      id: 1,
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MDZfMTYy%2FMDAxNjMwOTM3MDU4MDgw.-bYmpsStGodab660NxssdUeF98U63vp8DYJZucAztbAg.gW3fXoKqe7X4sLKKeUHIrLb9WoK_qA43DgH7sJYENlMg.JPEG.kkaykim%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5_%252811%2529.jpg&type=sc960_832",
      user_id: "임안꺽정",
      description: "너무 구려요!",
    },
    {
      id: 2,
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MDZfMTYy%2FMDAxNjMwOTM3MDU4MDgw.-bYmpsStGodab660NxssdUeF98U63vp8DYJZucAztbAg.gW3fXoKqe7X4sLKKeUHIrLb9WoK_qA43DgH7sJYENlMg.JPEG.kkaykim%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5_%252811%2529.jpg&type=sc960_832",
      user_id: "김미영팀장",
      description: "대출문의 010-8282-8282로 연락주세요",
    },
  ]);
  const user_id = "엠엠";
  const [description, setDescription] = useState("");
  return (
    <Card className="mb-3">
      <Card.Header as="h5">댓글</Card.Header>
      <Card.Body>
        <Card.Title>댓글 목록</Card.Title>
        {comments.map((comment) => (
          <Card className="mb-3" key={comment.id}>
            <Row className="align-items-center">
              <Col sm={1}>
                <img
                  src={comment.img}
                  style={{
                    width: "32px",
                    height: "32px",
                    marginLeft: "5px",
                    borderRadius: "13px",
                    border: "2px gray solid",
                  }}
                />
              </Col>
              <Col className="ms-3 mt-3 mb-3">
                <span>{comment.user_id}님</span>
                <br />
                <span style={{ color: "gray" }}>{comment.description}</span>
              </Col>
              {isEditable && (
                <Col sm={3}>
                  <DeleteButton />
                </Col>
              )}
            </Row>
          </Card>
        ))}
        <Form.Control
          as="textarea"
          placeholder="댓글을 입력해주세요"
          style={{ height: "100px", marginBottom: "5px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="primary"
          disabled={description.length === 0}
          onClick={addComment}
        >
          등록하기
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Comments;
