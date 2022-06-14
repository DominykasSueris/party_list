import React, { Component } from "react";
import Form from "../form/form";
import TableItem from "./tableItem";
import Table from "react-bootstrap/Table";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import "./table.css";

class TableBody extends Component {
  render() {
    const {
      items,
      task,
      handleDeleteItem,
      saveItem,
      onSort,
      sort,
      isAbleToCreateNew,
      handleAddItem,
      handleSaveItem
    } = this.props;

    return (
      <Table bordered striped>
        <thead>
          <tr>
            <th>Number</th>
            <th>Check</th>
            <th onClick={() => onSort("name")} sort={sort}>
              {sort === "asc" ? (
                <span>
                  <GoTriangleUp />
                </span>
              ) : (
                <span>
                  <GoTriangleDown />
                </span>
              )}
              Name
            </th>

            <th>Surname</th>
            <th>Check in date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <TableItem
              key={item.id}
              item={item}
              saveItem={saveItem}
              handleDeleteItem={handleDeleteItem}
              handleSaveItem={handleSaveItem}
            ></TableItem>
          ))}
          {isAbleToCreateNew ? (
            <tr>
              <td colSpan="6" className="right">
                <button className="btn btn-primary" onClick={handleAddItem}>
                  Add
                </button>
              </td>
            </tr>
          ) : (
            <Form handleSaveItem={handleSaveItem} />
          )}
        </tbody>
      </Table>
    );
  }
}

export default TableBody;
