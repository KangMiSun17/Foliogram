import React, { useState, useContext } from "react";
import { Form, Row } from "react-bootstrap";
import * as Api from "../../api";
import { BundleButton } from "../common/Button";
import { AwardFetchContext, AwardContext } from "../common/context/Context";
import { FormTextField } from "../common/Form";

/** Edit award component
 *
 * @param {boolean} setIsEditing - Change state whether editing or not
 * @returns EditForm
 */
function AwardEditForm({ setIsEditing }) {
  //To re-render
  const setReFetching = useContext(AwardFetchContext);
  const award = useContext(AwardContext);
  const [edit, setEdit] = useState({
    title: award.title,
    description: award.description,
  });

  //Click OK button, edit award
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Put request to update edited award
    try {
      await Api.put(`awards/${award.id}`, {
        title: edit.title,
        description: edit.description,
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
        <FormTextField
          placeholder="수상 내역"
          name="title"
          value={edit.title}
          changeFunction={setEdit}
        />
        <FormTextField
          placeholder="상세 내역"
          name="description"
          value={edit.description}
          changeFunction={setEdit}
        />
        <Row className="justify-content-center" xs="auto">
          <BundleButton submitHandler={handleSubmit} setState={setIsEditing} />
        </Row>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
