import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Party from "./party";
import Form from "../form/form";
//Todo update css
import "../table/table.css";

const PartyList = ({ partyList, setPartyList }) => {
  const [isFormVisible, setFormVisible] = useState(false);

  return (
    <Table bordered striped>
      <thead>
        <tr>
          <th>Number</th>
          <th>Check</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {partyList.map(party => (
          <Party key={party.id} party={party} partyList={partyList} setPartyList={setPartyList} />
        ))}
        {isFormVisible ? (
          <Form backFunction={setFormVisible} partyList={partyList} setPartyList={setPartyList} />
        ) : (
          <tr>
            <td colSpan="6" className="right">
              <button className="btn btn-primary" onClick={() => setFormVisible(true)}>
                Add
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default PartyList;
