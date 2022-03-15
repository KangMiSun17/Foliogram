import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import Educations from "./Educations";

function Education({ portfolioOwnerId, isEditable }) {
  const [eduList, setEduList] = useState([]);

  useEffect(() => {
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEduList(res.data)
    );
  }, [portfolioOwnerId]);
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>학력</CardTitle>
          {setEduList.map((val) => {
            <Educations
              key={val.id}
              title={val.title}
              desc={val.desc}
              isEditable={isEditable}
            />;
          })}
        </CardBody>
      </Card>
    </>
  );
}

export default Education;
