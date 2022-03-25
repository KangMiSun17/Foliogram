import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { CommentFetchContext, UserContext } from "../common/context/Context";
import CommentEditForm from "./CommentEditForm";
import * as Api from "../../api";
import { toObjectDate, toStringDate } from "../common/DateUtil";
// import { int } from "nunjucks/src/filters";

/** comment card component
 *
 * @param {object} comment each comment
 * @returns comment edit form or comment content
 */
function CommentCard({ comment, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const setComments = useContext(CommentFetchContext);
  const { user_id } = useContext(UserContext);
  const [hour, setHour] = useState(
    Number(comment.createdAt.split("T")[1].split(".")[0].split(":")[0]) + 9
  );

  useEffect(() => {
    if (24 <= hour) {
      return setHour((cur) => "0" + String(cur - 24));
    }
  }, []);

  const minute = comment.createdAt.split("T")[1].split(".")[0].split(":")[1];

  const deleteHandler = async () => {
    await Api.delete("comments", comment.id);
    setComments((cur) => {
      const newComment = [...cur];
      newComment.splice(index, 1);
      return newComment;
    });
  };

  const selectOption = (e) => {
    if (e.target.tabIndex === 1) {
      return setIsEditing(true);
    } else if (e.target.tabIndex === 2) {
      return deleteHandler();
    }
  };
  return (
    <Card className="mb-3" key={comment.id}>
      <Row className="align-items-center">
        {isEditing ? (
          <CommentEditForm
            comment={comment}
            setIsEditing={setIsEditing}
            index={index}
          />
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
              <Col className="me-2">
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
              <span>{comment.content}</span>
            </Row>
            <Row md={4} style={{ color: "gray" }}>
              <Col xl={4} className="ms-4 mb-2 p-0">
                {toStringDate(toObjectDate(comment.createdAt))}
              </Col>
              <Col xl={5} className="p-0">
                {hour} : {minute}
              </Col>
            </Row>
          </>
        )}
      </Row>
    </Card>
  );
}

export default CommentCard;
