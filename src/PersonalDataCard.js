import React, { useState } from "react";
import QRCode from 'qrcode.react';
import "./App.css";

function PersonalDataCard(props) {

  let [showQRCode, setShowQRCode] = useState(false);

  function handleShowQRCode() {
    console.log('handleShowQRCode')
    setShowQRCode(!showQRCode);
  }

  function createQRCode() {
    const obj = {
      firstName: props.firstName,
      lastName: props.lastName,
      address: props.address,
      telefon: props.telefon
    }
    var newItemAsJSON = JSON.stringify(obj);
    return newItemAsJSON;
  }

  return (
    <div className="Box">
      <p>Name: {props.firstName} {props.lastName}</p>
      <p>Address: {props.address}</p>
      <p>Telefon: {props.telefon}</p>
      <div>
        {showQRCode && <QRCode value={createQRCode()} level="L"/>}
      </div>
      <button onClick={(e) => props.remove(e, props.id)} className="button">
        Remove
      </button>
      <button onClick={handleShowQRCode} className="button">
        Show QR-Code
      </button>
    </div>
  );
}

export default PersonalDataCard;
