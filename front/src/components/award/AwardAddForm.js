import React, { useState, useContext } from "react";
import { Form, Row } from "react-bootstrap";
import { PlusButton, BundleButton, EditButton } from "../common/Button";
import {
  AwardFetchContext,
  PortfolioOwnerContext,
} from "../common/context/Context";
import { FormTextField } from "../common/Form";
import * as Api from "../../api";
import Submittable from "../common/Submittable";

/** Award add component
 *
 * @returns AddForm
 */
function AwardAddForm() {
  const portfolioOwnerId = useContext(PortfolioOwnerContext);
  //To re-render
  const setReFetching = useContext(AwardFetchContext);
  //Whether adding or not
  const [isAdding, setIsAdding] = useState(false);
  //initial award
  const init = {
    user_id: portfolioOwnerId,
    title: "",
    description: "",
  };
  //Added award title
  const [add, setAdd] = useState(init);
  const [able, setAble] = useState(true);

  //Click OK button, add award
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Post request to update added award'
    try {
      await Api.post(`award/create`, add);
      setAdd(init);
      setReFetching(new Date());
    } catch (err) {
      console.log("Error: award post request fail", err);
    }
    setIsAdding((cur) => !cur);
  };

  return (
    <>
      {!isAdding ? (
        <Row className="justify-content-center" xs="auto">
          <PlusButton setState={setIsAdding} />
        </Row>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Label>추가할 내용</Form.Label>
          <FormTextField
            placeholder="수상 내역"
            name="title"
            value={add.title}
            setState={setAdd}
          />
          <FormTextField
            placeholder="상세 내역"
            name="description"
            value={add.description}
            setState={setAdd}
          />
          <Submittable title={add.title} description={add.description} />
          <Row className="justify-content-center" xs="auto">
            <BundleButton submitHandler={handleSubmit} setState={setIsAdding} />
          </Row>
        </Form>
      )}
    </>
  );
}

export default AwardAddForm;
