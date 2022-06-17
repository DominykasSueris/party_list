import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import config from "../../services/config.json";

const Form = ({ party, backFunction, setPartyList, partyList }) => {
  const newParty = { done: false, name: "", description: "", dueDate: "" };
  const isEdit = !!party;
  party = party ? party : newParty;

  const [done, setDone] = useState(party.done);
  const [name, setName] = useState(party.name);
  const [description, setDescription] = useState(party.description);
  const [date, setDate] = useState(party.dueDate);

  useEffect(() => {
    party.done = done;
    party.name = name;
    party.description = description;
    party.dueDate = date;
  }, [party, done, name, description, date]);

  const location = useLocation();
  const auth = { auth: location.state };

  const save = () => {
    if (isEdit) {
      axios
        .put(`${config.apiEndPoint}/${party.id}`, party, auth)
        .then(response => {
          const index = partyList.findIndex(editedParty => response.data.id === editedParty.id);
          partyList[index] = response.data;
          setPartyList(partyList);
          backFunction(false);
        })
        .catch(error => alert("something went wrong"));
    } else {
      axios
        .post(config.apiEndPoint, party, auth)
        .then(res => {
          setPartyList([...partyList, res.data]);
          backFunction(false);
        })
        .catch(error => alert("party is not saved"));
    }
  };

  return (
    <tr>
      <td>{party.id}</td>
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
          onChange={date => setDate(date.toISOString().slice(0, 10))}
          name="dueDate"
          selected={Date.parse(date)}
          dateFormat="yyyy-MM-dd"
        />
      </td>
      <td className="action-buttons">
        <button className="btn btn-warning" onClick={save}>
          Save
        </button>
        <button className="btn btn-warning" onClick={() => backFunction(false)}>
          Back
        </button>
      </td>
    </tr>
  );
};

export default Form;
