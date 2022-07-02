import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../services/config.json";
import { UserContext } from "../../App";
import Pagination from "../pagination/pagination";
import { paginate } from "../pagination/paginate.js";
import PartyList from "../table/partyList";
import Spinner from "../spinner/spinner";

const Home = () => {
  const userContext = useContext(UserContext);
  const [partyList, setPartyList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    axios
      .get(config.apiEndPoint, {
        auth: { username: userContext.userName, password: userContext.userPassword }
      })
      .then(res => {
        setPartyList(res.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, [userContext]);

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
