import React, { useEffect, useState } from "react";
import axios from "axios";

function Certificates() {
  const [certificateList, setCertificateList] = useState([]);

  useEffect(() => {
    const getCertificateList = async () => {
      const res = await axios.get("http://localhost:3001/certificate");
      return res.data;
    };

    getCertificateList().then((data) => {
      setCertificateList(data);
    });
  }, []);
  console.log(certificateList);
  return (
    <>
      {certificateList.map((item) => {
        return (
          <>
            <h5>{item.title}</h5>
            {item.description}
            <br />
            {item.when_date}
          </>
        );
      })}
    </>
  );
}

export default Certificates;
