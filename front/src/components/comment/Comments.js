import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  PortfolioOwnerContext,
  CommentFetchContext,
} from "../common/context/Context";
import * as Api from "../../api";
import CommentCard from "./CommentCard";
import CommentAddForm from "./CommentAddForm";

function Comments({ user_id }) {
  const [reFetching, setReFetching] = useState(new Date());
  const portfolioOwnerId = useContext(PortfolioOwnerContext);
  const [comments, setComments] = useState([]);
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
          {comments.map((comment, index) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              user_id={user_id}
              index={index}
            />
          ))}
          <CommentAddForm user_id={user_id} />
        </Card.Body>
      </Card>
    </CommentFetchContext.Provider>
  );
}

export default Comments;
