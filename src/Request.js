import React, { useState } from "react";
import "./App.css";

function Card(props) {

  function handleRemove(id) {
    console.log(`remove request in card: ${id}`);
  }

  return (
    <div className="Box">
      <h2>Name: {props.firstName} {props.lastName}</h2>
      <h2>Age: {props.age}</h2>
      <hr/>
      <h3>Request: {props.request}</h3>
      <button onClick={() => handleRemove(props.id)}>
        Remove
      </button>
    </div>
  );
}

export default Card;
