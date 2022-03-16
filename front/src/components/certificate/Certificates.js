import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { UserStateContext } from "../../App";
import CertificateEditForm from "./CertificateEditForm";

function Certificates({ portfolioOwnerId }) {
  const [certificateList, setCertificateList] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const userState = useContext(UserStateContext);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getCertificateList = async () => {
      const res = await axios.get("http://localhost:3001/certificate");
      setCertificateList(res.data);
    };

    getCertificateList();
  }, []);

  useEffect(() => {
    if (userState.user.id === portfolioOwnerId) {
      setIsOwner(true);
      return;
    }
    setIsOwner(false);
  }, [userState.user.id, portfolioOwnerId]);

  console.log(certificateList);

  return (
    <>
      {isEditing ? (
        <CertificateEditForm setIsEditing={setIsEditing} />
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
