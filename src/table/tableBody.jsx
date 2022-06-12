import React, { Component } from "react";
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
      handleAddItem
    } = this.props;

    return (
      <React.Fragment>
        <Table bordered>
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
                editMode={item.editMode}
                isNewItem={item.isNewItem}
                key={item.id}
                item={item}
                task={task}
                saveItem={saveItem}
                handleDeleteItem={handleDeleteItem}
              ></TableItem>
            ))}
            <tr>
              <td colSpan="6" className="right">
                {isAbleToCreateNew ? (
                  <button className="btn btn-primary" onClick={handleAddItem}>
                    Add
                  </button>
                ) : null}
              </td>
            </tr>
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default TableBody;
