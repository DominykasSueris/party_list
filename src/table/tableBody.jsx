import React, { Component } from "react";
import TableItem from "./tableItem";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";

class TableBody extends Component {
  render() {
    const { items, task, handleDeleteItem, saveItem, onSort, sort } = this.props;
    return (
      <React.Fragment>
        <table className="table table-striped w-auto">
          <thead>
            <tr>
              <th>id</th>
              <th>checkbox</th>
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

              <th>description</th>
              <th>date</th>
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
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default TableBody;
