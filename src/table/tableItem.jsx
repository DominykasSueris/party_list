import React, { Component } from "react";

class TableItem extends Component {
  state = {
    editMode: false,
    done: true,
    item: []
  };

  componentDidMount = () => {
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
    const { done, editMode } = this.state;
    const { item, handleDeleteItem } = this.props;

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
            <input onChange={this.handleOnChange} name="name" value={this.state.item.name}></input>
          ) : (
            item.name
          )}
        </td>
        <td>
          {editMode ? (
            <input
              onChange={this.handleOnChange}
              name="description"
              value={this.state.item.description}
            ></input>
          ) : (
            item.description
          )}
        </td>
        <td>
          {editMode ? (
            <input
              onChange={this.handleOnChange}
              name="dueDate"
              value={this.state.item.dueDate}
            ></input>
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
