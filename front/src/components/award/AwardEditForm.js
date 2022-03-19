import React, { useState, useContext } from "react";
import { Form, Row } from "react-bootstrap";
import * as Api from "../../api";
import { BundleButton } from "../common/Button";
import { AwardFetchContext, AwardContext } from "../common/context/Context";

/** Edit award component
 *
 * @param {boolean} setIsEditing - Change state whether editing or not
 * @returns EditForm
 */
function AwardEditForm({ setIsEditing }) {
  //To re-render
  const { setReFetching } = useContext(AwardFetchContext);
  const award = useContext(AwardContext);
  //Edited title
  const [editTitle, setEditTitle] = useState(award.title);
  //Edited description
  const [editDescription, setEditDescription] = useState(award.description);

  //Click OK button, edit award
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Put request to update edited award
    try {
      await Api.put(`awards/${award.id}`, {
        title: editTitle,
        description: editDescription,
      });
      setReFetching(new Date());
    } catch (err) {
      console.log("Error: award put request fail", err);
    }

    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>수정할 내용</Form.Label>
        <Form.Control
          type="text"
          className="mb-3"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <Form.Control
          type="text"
          className="mb-3"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
        <Row className="justify-content-center" xs="auto">
          <BundleButton submitHandler={handleSubmit} setState={setIsEditing} />
        </Row>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
