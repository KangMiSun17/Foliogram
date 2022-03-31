import { useContext } from "react";
import { Col, Dropdown, DropdownButton } from "react-bootstrap";
import { CommentFetchContext, User1Context } from "../common/context/Context";
import * as Api from "../../api";
/**
 *
 * @param {object} comment each comment
 * @param {boolean} setIsEditing whether editing or not
 * @param {number} index comment index
 * @returns
 */
function SelectOption({ comment, setIsEditing, index }) {
  const { isEditable, user_id } = useContext(User1Context);
  const setComments = useContext(CommentFetchContext);
  //select edit or delete function
  const selectOption = (e) => {
    if (e.target.tabIndex === 1) {
      return setIsEditing(true);
    } else if (e.target.tabIndex === 2) {
      return deleteHandler();
    }
  };
  //delete function
  const deleteHandler = async () => {
    await Api.delete("comments", comment.id);
    setComments((cur) => {
      const newComment = [...cur];
      newComment.splice(index, 1);
      return newComment;
    });
  };

  return (
    <>
      {comment.user_id.id === user_id && (
        <Col sm={2} className="me-2">
          <DropdownButton
            key={comment.id}
            size="sm"
            title=""
            onClick={selectOption}
          >
            <Dropdown.Item tabIndex={1}>수정</Dropdown.Item>
            <Dropdown.Item tabIndex={2}>삭제</Dropdown.Item>
          </DropdownButton>
        </Col>
      )}
      {isEditable && comment.user_id.id !== user_id && (
        <Col sm={2} className="me-2">
          <DropdownButton
            key={comment.id}
            size="sm"
            title=""
            onClick={selectOption}
          >
            <Dropdown.Item tabIndex={2}>삭제</Dropdown.Item>
          </DropdownButton>
        </Col>
      )}
    </>
  );
}

export default SelectOption;
