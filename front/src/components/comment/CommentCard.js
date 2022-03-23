import React, { useContext, useState } from "react";
import { Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { CommentFetchContext } from "../common/context/Context";
import CommentEditForm from "./CommentEditForm";
import * as Api from "../../api";

function CommentCard({ comment, user_id, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const { setReFetching } = useContext(CommentFetchContext);
  const handleDelete = async () => {
    await Api.delete("comments", comment.id);
    setReFetching(new Date());
  };
  const selectOption = (e) => {
    if (e.target.tabIndex === 1) {
      return setIsEditing(true);
    } else if (e.target.tabIndex === 2) {
      return handleDelete();
    }
  };
  return (
    <Card className="mb-3" key={comment.id}>
      <Row className="align-items-center">
        {isEditing ? (
          <CommentEditForm comment={comment} setIsEditing={setIsEditing} />
        ) : (
          <>
            <Col sm={1} className="ms-1">
              <a href={`/users/${comment.user_id.id}`}>
                <img
                  src={comment.user_id.profileImage}
                  style={{
                    width: "32px",
                    height: "32px",
                    marginLeft: "5px",
                    borderRadius: "15px",
                    border: "1px gray solid",
                  }}
                  alt="comment img"
                />
              </a>
            </Col>
            <Col className="ms-3 mt-3 mb-3">
              <span>
                <a
                  href={`/users/${comment.user_id.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {comment.user_id.name}님
                </a>
              </span>
            </Col>
            {comment.user_id.id === user_id && (
              <Col sm={4}>
                <DropdownButton
                  key={comment.id}
                  size="sm"
                  title="수정/삭제"
                  onClick={selectOption}
                >
                  <Dropdown.Item tabIndex={1}>수정</Dropdown.Item>
                  <Dropdown.Item tabIndex={2}>삭제</Dropdown.Item>
                </DropdownButton>
              </Col>
            )}
            <Row className="ms-1 mb-2">
              <span style={{ color: "gray" }}>{comment.content}</span>
            </Row>
          </>
        )}
      </Row>
    </Card>
  );
}

export default CommentCard;
