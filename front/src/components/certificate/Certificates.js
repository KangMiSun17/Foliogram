import React, { useContext, useEffect, useState } from "react";
import {
  FecthContext,
  CertificateContext,
  PortfolioOwnerContext,
} from "./common/Context";
import Certificate from "./Certificate";
import * as Api from "../../api";

/**
 * @description This component that get list of certifications and show screen
 * @returns {component} List of certificate
 */
function Certificates() {
  const { isFetching } = useContext(FecthContext);
  const [certificateList, setCertificateList] = useState([]);
  const portfolioOwnerId = useContext(PortfolioOwnerContext);

  // All certificate data get - get request
  useEffect(() => {
    try {
      const getCertificateList = async () => {
        const res = await Api.get("certificatelist/" + portfolioOwnerId);
        console.log(res);
        setCertificateList(res.data);
      };

      getCertificateList();
    } catch (err) {
      console.log("Error: certificatelist get request fail", err);
    }
  }, [isFetching, portfolioOwnerId]);

  return (
    <>
      {certificateList.map((value) => (
        <CertificateContext.Provider key={value.id} value={value}>
          <Certificate />
        </CertificateContext.Provider>
      ))}
    </>
  );
}

export default Certificates;
