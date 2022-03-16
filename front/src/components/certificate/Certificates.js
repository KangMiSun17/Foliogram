import React, { useEffect, useState } from "react";
import axios from "axios";
import Certificate from "./Certificate";

function Certificates() {
  const [certificateList, setCertificateList] = useState([]);

  useEffect(() => {
    const getCertificateList = async () => {
      const res = await axios.get("http://localhost:3001/certificate");
      setCertificateList(res.data);
    };

    getCertificateList();
  }, []);

  return (
    <>
      {certificateList.map((value, index) => (
        <Certificate key={index} certificate={value} />
      ))}
    </>
  );
}

export default Certificates;
