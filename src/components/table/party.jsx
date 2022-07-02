import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../../services/config.json";
import { UserContext } from "../../App";
import Spinner from "../spinner/spinner";
import Form from "../form/form";

const Party = ({ party, partyList, setPartyList }) => {
  const { userName, userPassword } = useContext(UserContext);
  const [isEditMode, setEditMode] = useState(false);
  const [done, setDone] = useState(party.done);
  const [isLoading, setLoading] = useState(false);
  const auth = { auth: { username: userName, password: userPassword } };

  const deleteParty = partyId => {
    axios
      .delete(`${config.apiEndPoint}/${partyId}`, auth)
      .then(setPartyList(partyList.filter(party => party.id !== partyId)))
      .catch(error => console.log(error));
  };

  const handleCheckboxChange = () => {
    setLoading(true);
    party.done = !done;
    axios
      .put(`${config.apiEndPoint}/${party.id}`, party, auth)
      .then(response => {
        setDone(response.data.done);
        setLoading(false);
      })
      .catch(error => alert("something went wrong"));
  };

  return (
    <React.Fragment>
      {isEditMode ? (
        <Form
          party={party}
          setPartyList={setPartyList}
          partyList={partyList}
          backFunction={setEditMode}
        />
      ) : (
        <tr>
          <td>{party.id}</td>
          <td>
            {isLoading ? (
              <Spinner className="spinner-checkbox" />
            ) : (
              <input type="checkbox" checked={party.done} onChange={() => handleCheckboxChange()} />
            )}
          </td>
          <td>{party.name}</td>
          <td>{party.description}</td>
          <td>{party.dueDate}</td>
          <td className="action-buttons">
            <button className="btn btn-success" onClick={() => setEditMode(true)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => deleteParty(party.id)}>
              Delete
            </button>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default Party;
