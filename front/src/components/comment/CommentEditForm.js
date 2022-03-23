import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BundleButton } from "../common/Button";
import * as Api from "../../api";
import { CommentFetchContext } from "../common/context/Context";

function CommentEditForm({ comment, setIsEditing }) {
  const [editContent, setEditContent] = useState(comment.content);
  const { setReFetching } = useContext(CommentFetchContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`comments/${comment.id}`, {
        content: editContent,
      });
      setReFetching(new Date());
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
        submitHandler={handleSubmit}
      />
    </Row>
  );
}

export default CommentEditForm;
