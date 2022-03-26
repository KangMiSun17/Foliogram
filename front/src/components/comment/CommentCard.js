import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import CommentEditForm from "./CommentEditForm";
import CommentDate from "./CommentDate";
import SelectOption from "./SelectOption";

/** comment card component
 *
 * @param {object} comment each comment
 * @param {number} index comment index
 * @returns {component} comment edit form or comment content
 */
function CommentCard({ comment, index }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="mb-3" key={comment.id}>
      <Row className="align-items-center">
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
        <SelectOption
          comment={comment}
          setIsEditing={setIsEditing}
          index={index}
        />
        {isEditing ? (
          <CommentEditForm
            comment={comment}
            setIsEditing={setIsEditing}
            index={index}
          />
        ) : (
          <>
            <Row className="ms-1 mb-2">
              <span>{comment.content}</span>
            </Row>
            <CommentDate comment={comment} />
          </>
        )}
      </Row>
    </Card>
  );
}

export default CommentCard;
