import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as Api from "../../api";
import { CommentFetchContext, UserContext } from "../common/context/Context";

function CommentAddForm() {
  const { portfolioOwnerId, user_id } = useContext(UserContext);
  const { setComments } = useContext(CommentFetchContext);
  const [content, setContent] = useState("");
  const addComment = async () => {
    try {
      const res = await Api.post(`comments/create`, {
        user_id,
        content,
        target_user_id: portfolioOwnerId,
      });
      setComments((prev) => [...prev, res.data]);
    } catch (err) {
      console.log("Error: award post request fail", err);
    }
    setContent("");
  };
  return (
    <div>
      <Form.Control
        as="textarea"
        placeholder="댓글을 입력해주세요"
        style={{ height: "100px", marginBottom: "5px" }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        variant="primary"
        disabled={content.length === 0}
        onClick={addComment}
      >
        등록하기
      </Button>
    </div>
  );
}

export default CommentAddForm;
