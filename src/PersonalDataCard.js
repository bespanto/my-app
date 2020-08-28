import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import QRCode from 'qrcode.react';
import "./App.css";
import Popup from "./Popup";
import PersonalDataForm from "./PersonalDataForm";
import * as PersonalDataSlice from "./redux/PersonalDataSlice";

function PersonalDataCard(props) {
  const [id, setId] = useState(props.id);
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

  function handleSaveData(id, formData) {
    setId(formData.id)
    setFirstName(formData.firstName);
    setLastName(formData.lastName);
    setAddress(formData.address);
    setTelefon(formData.telefon);
    const newItem = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      address: address,
      telefon: telefon
    }

    dispatch(PersonalDataSlice.editPersonalData(newItem));
    setEditMode(false);
  }

  function handleShowPopup(isVisible) {
    setPopupIsVisible(isVisible);
  }

  function createQRCode() {
    var newItemAsJSON = JSON.stringify(obj);
    return newItemAsJSON;
  }

  return (
    <div className="container personal-card">
      {!editMode ?
        < div >
          <p>{firstName} {lastName}</p>
          <p>{address}</p>
          <p>{telefon}</p>
          <button onClick={(e) => props.remove(e, props.id)} className="button">
            Remove
        </button>
          <button onClick={(e) => handleShowPopup(true)} className="button">
            Show QR-Code
        </button>
          <button onClick={handleEditData} className="button">
            Edit
      </button>
        </div>
        :
        <PersonalDataForm
          submitButtonValue="Save"
          handleSubmit={handleSaveData}
          id={id}
          firstName={firstName}
          lastName={lastName}
          address={address}
          telefon={telefon} />
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
