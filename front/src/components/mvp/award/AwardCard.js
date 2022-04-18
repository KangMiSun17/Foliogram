import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { DeleteButton, EditButton } from "../../common/Button";
import { OwnerContext } from "../../common/context/Context";

/** Award list component
 *
 * @param {boolean} setIsEditing - Change state whether editing or not
 * @returns AwardList and edit button or null
 */
function AwardCard({ setIsEditing, award, setAwards }) {
  const { isEditable } = useContext(OwnerContext);

  return (
    <Row className="align-items-center">
      <Col className="mb-3">
        <span>{award.data.title}</span>
        <br />
        <span style={{ color: "gray" }}>{award.data.description}</span>
      </Col>
      {isEditable && (
        <>
          <Col sm={1}>
            <EditButton setState={setIsEditing} />
          </Col>
          <Col sm={1}>
            <DeleteButton
              endpoint={"awards"}
              id={award.data.id}
              setState={setAwards}
              index={award.index}
            />
          </Col>
        </>
      )}
    </Row>
  );
}

export default AwardCard;
