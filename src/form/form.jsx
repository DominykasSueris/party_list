import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import config from "../services/config.json";

const Form = ({ item, handleSaveItem }) => {
  const newItem = { done: false, name: "", description: "", date: "" };
  const edit = !!item;
  item = item ? item : newItem;
  const [done, setDone] = useState(item.done);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [date, setDate] = useState(item.dueDate);

  useEffect(() => {
    item.done = done;
    item.name = name;
    item.description = description;
    item.date = date;
  }, [item, done, name, description, date]);

  const location = useLocation();
  const auth = { auth: location.state };

  const save = () => {
    console.log(auth);
    if (!edit) {
      axios
        .post(config.apiEndPoint, item, auth)
        .then(response => {
          handleSaveItem(response.data);
        })
        .catch(error => alert("Item is not saved"));
    } else {
      axios
        .put(`${config.apiEndPoint}/${item.id}`, item, auth)
        .then(response => {
          handleSaveItem(response.data);
        })
        .catch(error => alert("something went wrong"));
    }
  };

  return (
    <tr>
      <td>{item.id}</td>
      <td>
        <input type="checkbox" value={done} onClick={() => setDone(!done)} />
      </td>
      <td>
        <input onChange={e => setName(e.target.value)} name="name" value={name}></input>
      </td>
      <td>
        <input
          onChange={e => setDescription(e.target.value)}
          name="description"
          value={description}
        ></input>
      </td>
      <td>
        <DatePicker
          onChange={date => setDate(date)}
          name="dueDate"
          selected={date}
          dateFormat="yyyy-MM-dd"
        />
      </td>
      <td id="action-buttons">
        {/* <button className="btn btn-warning" onClick={this.save}> */}
        <button className="btn btn-warning" onClick={save}>
          Save
        </button>
      </td>
    </tr>
  );
};

export default Form;
