import React, { useState } from "react";
import axios from "axios";
import config from "../services/config.json";
import { useLocation } from "react-router-dom";
import Form from "../form/form";

const Party = ({ party, partyList, setPartyList }) => {
  const [isEditMode, setEditMode] = useState(false);
  const location = useLocation();

  const deleteParty = partyId => {
    axios
      .delete(`${config.apiEndPoint}/${partyId}`, { auth: location.state })
      .then(setPartyList(partyList.filter(party => party.id !== partyId)))
      .catch(error => console.log(error));
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
            <input type="checkbox" value={party.done} />
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
