import { useContext, useState } from "react";
import { Form, Row } from "react-bootstrap";
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
    <div>
      <Row className="justify-content-center">
        <Form.Control
          className="mb-2"
          as="textarea"
          placeholder="댓글을 입력해주세요"
          style={{ height: "100px", width: "80%" }}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
      </Row>
      <BundleButton
        disabled={editContent.length === 0}
        setState={setIsEditing}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default CommentEditForm;
