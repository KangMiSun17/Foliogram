import React, { useState, useContext } from "react";
import { Alert, Form, Row } from "react-bootstrap";
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
  const setAwards = useContext(AwardFetchContext);
  const { award, index } = useContext(AwardContext);
  const [edit, setEdit] = useState({
    title: award.title,
    description: award.description,
  });
  const notSubAble = edit.title.length === 0 || edit.description.length === 0;

  //Click OK button, edit award
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Put request to update edited award
    try {
      const res = await Api.put(`awards/${award.id}`, {
        title: edit.title,
        description: edit.description,
      });
      setAwards((cur) => {
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
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>수정할 내용</Form.Label>
        <FormTextField
          placeholder="수상 내역"
          name="title"
          value={edit.title}
          setState={setEdit}
        />
        <FormTextField
          placeholder="상세 내역"
          name="description"
          value={edit.description}
          setState={setEdit}
        />
        {notSubAble ? (
          <Alert variant="danger">
            <p>내용을 입력해주세요.</p>
          </Alert>
        ) : null}
        <Row className="justify-content-center" xs="auto">
          <BundleButton
            disabled={notSubAble}
            submitHandler={handleSubmit}
            setState={setIsEditing}
          />
        </Row>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
