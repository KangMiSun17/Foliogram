import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { UserContext, CommentFetchContext } from "../common/context/Context";
import * as Api from "../../api";
import CommentCard from "./CommentCard";
import CommentAddForm from "./CommentAddForm";

/** comment list component
 * @param {string} user_id login id
 * @returns comment and add form
 */
function Comments() {
  const [reFetching, setReFetching] = useState(new Date());
  const { portfolioOwnerId, user_id } = useContext(UserContext);
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
  }, [portfolioOwnerId, reFetching]);
  return (
    <CommentFetchContext.Provider value={{ setReFetching, setComments }}>
      <Card className="mb-3">
        <Card.Header as="h5">댓글</Card.Header>
        <Card.Body>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
          <CommentAddForm />
        </Card.Body>
      </Card>
    </CommentFetchContext.Provider>
  );
}

export default Comments;
