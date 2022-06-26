import React from "react";
import { useEffect } from "react";
import axios from "axios";

const server_url = process.env.REACT_APP_server_url;
const Success = () => {
  useEffect(() => {
    updateContribution();
  }, []);

  const updateContribution = async () => {
    const donation = JSON.parse(localStorage.getItem("donationToken"));

    // const res = await axios.post(`${server_url}/api/`,{
    //   userEmail: donation.eventsEventId,
    //   eventsEventId: donation.eventsEventId,
    //   monetary: donation.monetary,
    // });
  };

  return <div className="success">Success</div>;
};

export default Success;
