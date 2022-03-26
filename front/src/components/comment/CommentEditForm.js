import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BundleButton } from "../common/Button";
import * as Api from "../../api";
import { CommentFetchContext } from "../common/context/Context";

/**
 *
 * @param {object} comment each comment object
 * @param {boolean} setIsEditing whether editing or not
 * @param {number} index comment index
 * @returns
 */
function CommentEditForm({ comment, setIsEditing, index }) {
  const setComments = useContext(CommentFetchContext);
  const [editContent, setEditContent] = useState(comment.content);
  //edit function
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.put(`comments/${comment.id}`, {
        content: editContent,
      });
      setComments((cur) => {
        cur[index] = res.data;
        const newComment = [...cur];
        return newComment;
      });
    } catch (err) {
      console.log("Error: award put request fail", err);
    }

    setIsEditing(false);
  };

  return (
    <Row className="align-items-center">
      <Col sm={1} className="ms-1">
        <img
          src={comment.user_id.profileImage}
          style={{
            width: "32px",
            height: "32px",
            marginLeft: "5px",
            borderRadius: "13px",
            border: "2px gray solid",
          }}
          alt="comment img"
        />
      </Col>
      <Col className="ms-3 mt-3 mb-3">
        <span>{comment.user_id.name}님</span>
      </Col>
      <Row className="ms-2 mb-2">
        <br />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      </Row>
      <BundleButton
        disabled={editContent.length === 0}
        setState={setIsEditing}
        submitHandler={submitHandler}
      />
    </Row>
  );
}

export default CommentEditForm;
