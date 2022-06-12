import React, { Component } from "react";
import Form from "../form/form";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./table.css";

class TableItem extends Component {
  state = {
    editMode: false,
    done: true,
    item: {
      name: "",
      description: "",
      dueDate: new Date()
    }
  };

  componentDidMount = () => {
    let item = this.props.item;
    item.dueDate = new Date(item.dueDate);
    this.setState({ item: item });
    if (this.props.editMode) {
      this.switchToEditMode({});
    }
  };

  switchToEditMode = item => {
    this.setState({ editMode: true, item });
  };

  // save = () => {
  //   this.setState({ editMode: false });
  //   this.props.saveItem(this.state.item, this.props.isNewItem);
  // };

  handleOnChange = ({ currentTarget: input }) => {
    const item = { ...this.state.item };
    item[input.name] = input.value;
    this.setState({ item });
  };

  render() {
    const { item, done, editMode } = this.state;
    const { handleDeleteItem } = this.props;

    return (
      <React.Fragment>
        {editMode ? (
          <Form item={item} handleSaveItem={this.props.handleSaveItem} />
        ) : (
          <tr>
            <td>{item.id}</td>
            <td>
              <input type="checkbox" value={done} />
            </td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.dueDate.toISOString().slice(0, 10)}</td>
            <td className="action-buttons">
              <button className="btn btn-success" onClick={() => this.switchToEditMode(item)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDeleteItem(item.id)}>
                Delete
              </button>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  }
}

export default TableItem;
