import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { User1Context, CommentFetchContext } from "../common/context/Context";
import * as Api from "../../api";
import CommentCard from "./CommentCard";
import CommentAddForm from "./CommentAddForm";

/** comment list component
 *
 * @returns comment and add form
 */
function Comments() {
  const { portfolioOwnerId } = useContext(User1Context);
  const [comments, setComments] = useState([]);
  //get comment list
  useEffect(() => {
    try {
      const getCommentList = async () => {
        const res = await Api.get(`commentlist`, portfolioOwnerId);
        setComments(res.data);
      };
      getCommentList();
    } catch (err) {
      console.log("Error: comment list get request fail", err);
    }
  }, [portfolioOwnerId]);

  return (
    <CommentFetchContext.Provider value={setComments}>
      <Card className="mb-3">
        <Card.Header as="h5">댓글</Card.Header>
        <Card.Body>
          {comments.map((comment, index) => (
            <CommentCard key={comment.id} comment={comment} index={index} />
          ))}
          <CommentAddForm comments={comments} />
        </Card.Body>
      </Card>
    </CommentFetchContext.Provider>
  );
}

export default Comments;
