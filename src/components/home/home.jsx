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
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState("false");
  const [filterValue, setFilterValue] = useState("");

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

  const handleFilter = () => {
    setFilter(!filter);
  };

  const handleFilterSubmit = e => {
    e.preventDefault();
    console.log("Submited");
  };

  return isLoading ? (
    <Spinner className="spinner-border-home" />
  ) : (
    <React.Fragment>
      {filter ? (
        <form className="filter-form" onSubmit={handleFilterSubmit}>
          <Input
            name="filter"
            label=""
            value={filterValue}
            onChange={e => setFilterValue(e.target.value)}
            type="text"
          />
          <button className="btn btn-warning">Submit</button>
          <button className="btn btn-warning" onClick={handleFilter}>
            Back
          </button>
        </form>
      ) : (
        <button className="btn btn-primary" onClick={handleFilter}>
          Filter
        </button>
      )}
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
