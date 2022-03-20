import React, { useState, useContext } from "react";
import { Form, Row } from "react-bootstrap";
import { PlusButton, BundleButton } from "../common/Button";
import {
  AwardFetchContext,
  PortfolioOwnerContext,
} from "../common/context/Context";
import * as Api from "../../api";

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
  //Added award title
  const [addTitle, setAddTitle] = useState("");
  //Added award description
  const [addDescription, setAddDescription] = useState("");

  //Click OK button, add award
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Post request to update added award
    try {
      await Api.post(`award/create`, {
        user_id: portfolioOwnerId,
        title: addTitle,
        description: addDescription,
      });
      setAddTitle("");
      setAddDescription("");
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="수상 내역"
              value={addTitle}
              onChange={(e) => setAddTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="상세 내역"
              value={addDescription}
              onChange={(e) => setAddDescription(e.target.value)}
            />
          </Form.Group>
          <Row className="justify-content-center" xs="auto">
            <BundleButton submitHandler={handleSubmit} setState={setIsAdding} />
          </Row>
        </Form>
      )}
    </>
  );
}

export default AwardAddForm;
