import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../services/config.json";
import { UserContext } from "../../App";
import Pagination from "../pagination/pagination";
import { paginate } from "../pagination/paginate.js";
import PartyList from "../table/partyList";
import Spinner from "../spinner/spinner";
import Input from "../login/input";
import "../home/home.css";

const Home = () => {
  const userContext = useContext(UserContext);
  const [partyList, setPartyList] = useState([]);
  const [filteredPartyList, setFilteredPartyList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [filterValue, setFilterValue] = useState();

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
    setList(paginate(filteredPartyList, currentPage, pageSize));
  }, [partyList, currentPage, pageSize, filteredPartyList]);

  const filerList = filterValue => {
    setFilterValue(filterValue);
    const list = partyList.filter(
      l =>
        l.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        l.description.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredPartyList(list);
  };

  return isLoading ? (
    <Spinner className="spinner-border-home" />
  ) : (
    <React.Fragment>
      <Input
        name="filter"
        label=""
        value={filterValue}
        onChange={e => filerList(e.target.value)}
        type="text"
      />
      <PartyList partyList={filteredPartyList} currentPageList={list} setPartyList={setPartyList} />
      <Pagination
        itemsCount={filteredPartyList.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={currentPage => setCurrentPage(currentPage)}
      />
    </React.Fragment>
  );
};

export default Home;
