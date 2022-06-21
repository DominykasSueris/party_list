import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../services/config.json";
import Pagination from "../pagination/pagination";
import { paginate } from "../pagination/paginate.js";
import PartyList from "../table/partyList";
import { useLocation } from "react-router-dom";
import Spinner from "../spinner/spinner";

const Home = () => {
  const [partyList, setPartyList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const location = useLocation();

  useEffect(() => {
    axios
      .get(config.apiEndPoint, { auth: location.state })
      .then(res => {
        setPartyList(res.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, [location.state]);

  useEffect(() => {
    setList(paginate(partyList, currentPage, pageSize));
  }, [partyList, currentPage, pageSize]);

  return isLoading ? (
    <Spinner className="spinner-border-home" />
  ) : (
    <React.Fragment>
      <PartyList partyList={partyList} currentPageList={list} setPartyList={setPartyList} />
      <Pagination
        itemsCount={partyList.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={currentPage => setCurrentPage(currentPage)}
      />
    </React.Fragment>
  );
};

export default Home;
