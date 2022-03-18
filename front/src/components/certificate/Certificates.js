import React, { useContext, useEffect, useState } from "react";
import {
  FetchContext,
  CertificateContext,
  PortfolioOwnerContext,
} from "../common/context/Context";
import Certificate from "./Certificate";
import * as Api from "../../api";

/**
 * @description This component that get list of certifications and show screen
 * @returns {component} List of certificate
 */
function Certificates() {
  const { isFetching } = useContext(FetchContext);
  const [certificateList, setCertificateList] = useState([]);
  const portfolioOwnerId = useContext(PortfolioOwnerContext);

  // All certificate data get - get request
  useEffect(() => {
    try {
      const getCertificateList = async () => {
        const res = await Api.get("certificatelist/" + portfolioOwnerId);
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
