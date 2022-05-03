import React, { Component } from "react";
import config from "../services/config.json";
import axios from "axios";
import TableBody from "./tableBody";
import Pagination from "../pagination/pagination";
import { paginate } from "../pagination/paginate";
import Error from "../error";
import "../App.css";

class Table extends Component {
  state = {
    items: [],
    currentPage: 1,
    pageSize: 4,
    sort: "asd",
    party: {
      name: "",
      description: "",
      dueDate: ""
    },
    isAbleToCreateNew: true,
    auth: {},
    error: false
  };

  componentDidMount = async () => {
    const { data: items } = await axios
      .get(config.apiEndPoint, { auth: this.props.location.state })
      .then(this.setState({ auth: { auth: this.props.location.state } }))
      .catch(error => this.setState({ error: true }));
    this.setState({ items });
  };

  handleAddItem = e => {
    e.preventDefault();
    const newItem = {
      editMode: true,
      isNewItem: true,
      id: "",
      name: "",
      description: "",
      dueDate: ""
    };
    const items = this.state.items;
    items.push(newItem);
    this.setState({ items, isAbleToCreateNew: false });
  };

  handleFormSubmit = ({ currentTarget: input }) => {
    const party = { ...this.state.party };
    party[input.name] = input.value;
    this.setState({ party });
  };

  handleDeleteItem = id => {
    const { auth, items } = this.state;
    axios
      .delete(`${config.apiEndPoint}/${id}`, auth)
      .then(this.setState({ items: items.filter(item => item.id !== id) }))
      .catch(error => alert("Something went wrong "));
  };

  saveItem = (item, isNewItem) => {
    const { auth } = this.state;
    if (isNewItem) {
      axios
        .post(config.apiEndPoint, item, auth)
        .then(response => {
          const items = [response.data, ...this.state.items];
          this.setState({ items: items.filter(i => i.id !== ""), isAbleToCreateNew: true });
        })
        .catch(error => alert("Item is not saved"));
    } else {
      axios
        .put(`${config.apiEndPoint}/${item.id}`, item, auth)
        .then(response => {
          const index = this.state.items.findIndex(oldItem => item.id === oldItem.id);
          const items = this.state.items;
          items[index] = response.data;
          this.setState({ items });
        })
        .catch(error => alert("something went wrong"));
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = () => {
    const sorted = [...this.state.items];
    if (this.state.sort === "asc") {
      this.setState({ items: sorted.sort((a, b) => a.name.localeCompare(b.name)), sort: "dsc" });
    } else {
      this.setState({ items: sorted.sort((a, b) => b.name.localeCompare(a.name)), sort: "asc" });
    }
  };

  render() {
    const { length: count } = this.state.items;
    const {
      currentPage,
      pageSize,
      items: allItems,
      updateButton,
      party,
      isAbleToCreateNew,
      sort
    } = this.state;

    const items = paginate(allItems, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="main-table">
          {this.state.error === true ? <Error /> : null}
          <TableBody
            items={items}
            updateButton={updateButton}
            party={party}
            handleDeleteItem={this.handleDeleteItem}
            saveItem={this.saveItem}
            onSort={this.handleSort}
            sort={sort}
          />
          <Pagination
            itemsCount={count}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
          {isAbleToCreateNew ? (
            <button className="btn btn-primary" onClick={this.handleAddItem}>
              Add
            </button>
          ) : null}
        </div>
        <div></div>
      </React.Fragment>
    );
  }
}

export default Table;
