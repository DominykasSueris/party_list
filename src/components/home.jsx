import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../services/config.json";
import PartyList from "./partyList";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [partyList, setPartyList] = useState([]);

  const location = useLocation();

  useEffect(() => {
    axios
      .get(config.apiEndPoint, { auth: location.state })
      .then(res => setPartyList(res.data))
      .catch(error => console.log(error));
  }, []);

  return <PartyList partyList={partyList} setPartyList={setPartyList} />;
};

export default Home;
