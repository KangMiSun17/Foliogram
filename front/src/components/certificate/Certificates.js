import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import CertificateEditForm from "./CertificateEditForm";
import { OwnerContext, EditContext } from "./common/Context";

function Certificates() {
  const [certificateList, setCertificateList] = useState([]);
  const { isEditing, setIsEditing } = useContext(EditContext);
  const { isOwner } = useContext(OwnerContext);

  useEffect(() => {
    const getCertificateList = async () => {
      const res = await axios.get("http://localhost:3001/certificate");
      setCertificateList(res.data);
    };

    getCertificateList();
  }, []);

  console.log(certificateList);

  return (
    <>
      {isEditing ? (
        <CertificateEditForm />
      ) : (
        certificateList.map((item, index) => {
          return (
            <div key={index}>
              <p className="mb-0">{item.title}</p>
              <p className="mb-0">{item.description}</p>
              <p>{item.when_date}</p>
              {isOwner && (
                <Button
                  variant="outline-info"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              )}
            </div>
          );
        })
      )}
    </>
  );
}

export default Certificates;
