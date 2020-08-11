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
      <p>Name: {props.firstName} {props.lastName}</p>
      <p>Age: {props.age}</p>
      <p>Request: {props.request}</p>
      <div>
        <QRCode value={createQRCode()} level="L" />
      </div>
      <button onClick={(e) => props.remove(e, props.id)} className="button">
        Remove
      </button>
    </div>
  );
}

export default RequestCard;
