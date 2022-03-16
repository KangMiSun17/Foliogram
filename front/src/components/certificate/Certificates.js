import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Certificate from "./Certificate";
import { FecthContext } from "./common/Context";

function Certificates() {
  const { isFetching } = useContext(FecthContext);
  const [certificateList, setCertificateList] = useState([]);

  useEffect(() => {
    const getCertificateList = async () => {
      const res = await axios.get("http://localhost:3001/certificate");
      setCertificateList(res.data);
    };

    getCertificateList();
  }, [isFetching]);

  return (
    <>
      {certificateList.map((value, index) => (
        <Certificate key={index} certificate={value} />
      ))}
    </>
  );
}

export default Certificates;
