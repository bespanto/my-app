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
  const [phone, setPhone] = useState(props.phone);
  const [editMode, setEditMode] = useState(false);
  const [popupIsVisible, setPopupIsVisible] = useState(false);
  const dispatch = useDispatch();

  function handleEditData() {
    setEditMode(true);
  }

  function handleSaveData(id, formData) {
    setId(formData.id)
    setFirstName(formData.firstName);
    setLastName(formData.lastName);
    setAddress(formData.address);
    setPhone(formData.phone);
    const newItem = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone: phone
    }

    dispatch(PersonalDataSlice.editPersonalData(newItem));
    setEditMode(false);
  }

  function handleShowPopup(isVisible) {
    setPopupIsVisible(isVisible);
  }

  function createQRCode() {
    return JSON.stringify({
      id: props.id,
      firstName: props.firstName,
      lastName: props.lastName,
      address: props.address,
      phone: props.phone
    });
  }

  return (
    <div className="personal-card">
      {!editMode ?
        <div>
          <p>{firstName} {lastName}</p>
          <p>{address}</p>
          <p>{phone}</p>
          <button onClick={(e) => props.remove(e, props.id)} className="button">
            Remove
          </button>
          <button onClick={(e) => handleShowPopup(true)} className="button">
            QR-Code
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
          phone={phone} />
      }
      {popupIsVisible &&
        <Popup showPopup={handleShowPopup}>
          <div>
            <QRCode value={createQRCode()} level="L" />
          </div>
        </Popup>}

    </div >
  );
}

export default PersonalDataCard;
