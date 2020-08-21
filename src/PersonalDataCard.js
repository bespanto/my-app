import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import QRCode from 'qrcode.react';
import "./App.css";
import { changePersonalData } from './actions'
import Popup from "./Popup";

function PersonalDataCard(props) {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [address, setAddress] = useState(props.address);
  const [telefon, setTelefon] = useState(props.telefon);
  const [editMode, setEditMode] = useState(false);
  const [popupIsVisible, setPopupIsVisible] = useState(false);
  const dispatch = useDispatch();

  const obj = {
    id: props.id,
    firstName: props.firstName,
    lastName: props.lastName,
    address: props.address,
    telefon: props.telefon
  }

  function handleEditData() {
    setEditMode(true);
  }

  function handleSaveData(id) {
    
    const newItem = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      address: address,
      telefon: telefon
    }
    dispatch(changePersonalData(newItem));
    setEditMode(false);
  }

  function handleShowPopup(isVisible) {
    setPopupIsVisible(isVisible);
  }

  function createQRCode() {
    var newItemAsJSON = JSON.stringify(obj);
    return newItemAsJSON;
  }

  function handleChange(event) {
    switch (event.target.name) {
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      case "address":
        setAddress(event.target.value);
        break;
      case "telefon":
        setTelefon(event.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="Box">
      {!editMode ?
        < div >
          <p>Name: {firstName} {lastName}</p>
          <p>Address: {address}</p>
          <p>Telefon: {telefon}</p>
          <button onClick={(e) => props.remove(e, props.id)} className="button">
            Remove
        </button>
          <button onClick={(e) => handleShowPopup(true)} className="button">
            Show QR-Code
        </button>
          <button onClick={handleEditData} className="button">
            Edit data
      </button>
        </div>
        :
        <form onSubmit={() => handleSaveData(props.id)}>
          <div className="grid-container">
            <div className="grid-item">
              First name:
          </div>
            <div className="grid-item">
              <input
                name="firstName"
                type="text"
                value={firstName}
                onChange={handleChange}
              />
            </div>
            <div className="grid-item">
              Last name:
          </div>
            <div className="grid-item">
              <input
                name="lastName"
                type="text"
                value={lastName}
                onChange={handleChange}
              />
            </div>
            <div className="grid-item">
              Address:
          </div>
            <div className="grid-item">
              <input name="address" type="text" value={address} onChange={handleChange} />
            </div>
            <div className="grid-item">
              Telefon:
          </div>
            <div className="grid-item">
              <input
                name="telefon"
                type="text"
                value={telefon}
                onChange={handleChange}
              />
            </div>
          </div>
          <br />
          <input type="submit" value="Save Data" className="button" />
        </form>
      }
      {popupIsVisible &&
        <Popup text="Popup content" personalDataId={props.id} showPopup={handleShowPopup}>
          <div>
            <QRCode value={createQRCode()} level="L" />
          </div>
        </Popup>}

    </div >
  );
}

export default PersonalDataCard;
