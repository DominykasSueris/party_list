import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../services/config.json";
import PartyList from "./partyList";
import { useLocation } from "react-router-dom";
import Spiner from "../spinner/spinner";

const Home = () => {
  const [partyList, setPartyList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    axios
      .get(config.apiEndPoint, { auth: location.state })
      .then(res => setPartyList(res.data), setLoading(false))
      .catch(error => console.log(error));
  }, [isLoading]);

  return isLoading ? <Spiner /> : <PartyList partyList={partyList} setPartyList={setPartyList} />;
};

export default Home;
