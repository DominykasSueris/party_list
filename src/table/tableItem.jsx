import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

class TableItem extends Component {
  state = {
    editMode: false,
    done: true,
    item: []
  };

  componentDidMount = () => {
    this.setState({ item: this.props.item });
    if (this.props.editMode) {
      this.switchToEditMode({});
    }
  };

  switchToEditMode = item => {
    this.setState({ editMode: true, item });
  };

  save = () => {
    this.setState({ editMode: false });
    this.props.saveItem(this.state.item, this.props.isNewItem);
  };

  handleOnChange = ({ currentTarget: input }) => {
    const item = { ...this.state.item };
    item[input.name] = input.value;
    this.setState({ item });
  };

  render() {
    const { item, done, editMode } = this.state;
    const { handleDeleteItem } = this.props;

    return (
      <tr>
        <td>{item.id}</td>
        <td>
          <input
            type="checkbox"
            value={done}
            onClick={e => this.setState(state => ({ done: !state.done }))}
          />
        </td>
        <td>
          {editMode ? (
            <input onChange={this.handleOnChange} name="name" value={item.name}></input>
          ) : (
            item.name
          )}
        </td>
        <td>
          {editMode ? (
            <input
              onChange={this.handleOnChange}
              name="description"
              value={item.description}
            ></input>
          ) : (
            item.description
          )}
        </td>
        <td>
          {editMode ? (
            <DatePicker
              onChange={date => {
                let item = this.state.item;
                item.dueDate = new Date(date).toISOString().slice(0, 10);
                this.setState(item);
              }}
              name="dueDate"
              selected={new Date(item.dueDate)}
            />
          ) : (
            item.dueDate
          )}
        </td>
        <td>{item.done}</td>
        <td>
          {editMode ? (
            <button className="btn btn-warning" onClick={this.save}>
              Save
            </button>
          ) : (
            <button className="btn btn-success" onClick={() => this.switchToEditMode(item)}>
              Edit
            </button>
          )}
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => handleDeleteItem(item.id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default TableItem;
