import React, { useState } from "react";
import "./App.css";

function RequestCard(props) {

  return (
    <div className="Box" id="{props.firstName}">
      <h2>Name: {props.firstName} {props.lastName}</h2>
      <h2>Age: {props.age}</h2>
      <hr/>
      <h3>Request: {props.request}</h3>
      <button onClick={(e) => props.remove(e, props.id)}>
        Remove
      </button>
    </div>
  );
}

export default RequestCard;
