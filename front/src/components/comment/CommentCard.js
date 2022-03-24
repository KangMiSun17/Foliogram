import React, { useContext, useState } from "react";
import { Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { CommentFetchContext, UserContext } from "../common/context/Context";
import CommentEditForm from "./CommentEditForm";
import * as Api from "../../api";
import { toObjectDate, toStringDate } from "../common/DateUtil";
import { int } from "nunjucks/src/filters";

/** comment card component
 *
 * @param {object} comment each comment
 * @returns comment edit form or comment content
 */
function CommentCard({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const { setReFetching } = useContext(CommentFetchContext);
  const { user_id } = useContext(UserContext);
  const [hour, setHour] = useState(
    int(comment.createdAt.split("T")[1].split(".")[0].split(":")[0]) + 9
  );

  if (24 <= hour || hour < 10) {
    setHour((cur) => "0" + String(cur - 24));
  }

  const minute = comment.createdAt.split("T")[1].split(".")[0].split(":")[1];

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
              <span>{comment.content}</span>
            </Row>
            <Row style={{ color: "gray" }}>
              <Col sm={3} className="ms-4 mb-2 p-0">
                {toStringDate(toObjectDate(comment.createdAt))}
              </Col>
              <Col sm={3} className="p-0">
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
