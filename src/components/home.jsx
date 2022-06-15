import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../services/config.json";
import PartyList from "./partyList";
import { useLocation } from "react-router-dom";
import Spiner from "../spinner/spinner";

const Home = () => {
  const [partyList, setPartyList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isSorted, setSorting] = useState(false);

  const location = useLocation();

  const sorting = () => {
    const newSorting = !isSorted;
    setSorting(newSorting);
    setPartyList(partyList =>
      partyList.sort((a, b) => {
        return newSorting ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      })
    );
  };

  useEffect(() => {
    axios
      .get(config.apiEndPoint, { auth: location.state })
      .then(res => setPartyList(res.data))
      .catch(error => console.log(error));
    setLoading(false);
  }, [location.state]);

  return isLoading ? (
    <Spiner />
  ) : (
    <PartyList
      partyList={partyList}
      setPartyList={setPartyList}
      sorting={sorting}
      isSorted={isSorted}
    />
  );
};

export default Home;
