import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./table.css";

class TableItem extends Component {
  componentDidMount = () => {
    // let item = this.props.item;
    // item.dueDate = new Date(item.dueDate);
    // this.setState({ item: item });
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
    const { item } = this.props;
    const { handleDeleteItem } = this.props;

    return (
      <React.Fragment>
        <tr>
          <td>{item.id}</td>
          <td>
            <input type="checkbox" value={item.done} />
          </td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          {/* <td>{item.dueDate}</td> */}
          <td>a</td>
          <td className="action-buttons">
            <button className="btn btn-success" onClick={() => this.switchToEditMode(item)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => handleDeleteItem(item.id)}>
              Delete
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default TableItem;
