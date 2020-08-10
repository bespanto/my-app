import React from "react";
import QRCode from 'qrcode.react';
import "./App.css";

function RequestCard(props) {

  function createQRCode() {

    const obj = {
      firstName: props.firstName,
      lastName: props.lastName,
      age: props.age,
      request: props.request
    }
    var newItemAsJSON = JSON.stringify(obj);
    return newItemAsJSON;
  }

  return (
    <div className="Box">
      <h3>Name: {props.firstName} {props.lastName}</h3>
      <h3>Age: {props.age}</h3>
      <h3>Request: {props.request}</h3>
      <div>
        <QRCode value={createQRCode()} level="L" />
      </div>
      <button onClick={(e) => props.remove(e, props.id)}>
        Remove
      </button>
    </div>
  );
}

export default RequestCard;
