import React, { useState } from "react";
import PersonalDataCard from "./PersonalDataCard";
import TabPanel from "./TabPanel";
import persData from "./personalDataSet";
import shortid from 'shortid';
import "./App.css";
import Popup from "./Popup";

function Main(props) {

  const [personalDataSet, setPersonalDataSet] = useState(persData);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [telefon, setTelefon] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);

  function togglePopup(isVisible) {
    setPopupVisible(isVisible);
  }

  function cahngeTab(index) {
    console.log(`activatedTab: ${index}`)
    setActiveTab(index);
  }

  function handleRemove(e, id) {
    e.preventDefault();
    let arr = [...personalDataSet];
    let filteredArray = arr.filter(item => item.id !== id);
    setPersonalDataSet(filteredArray);
  }

  function handleChange(event) {
    console.log(`Change State of ${event.target.name}`);
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

  function handleSubmit(event) {
    event.preventDefault();
    const index = shortid.generate();
    const newItem = {
      id: index,
      firstName: firstName,
      lastName: lastName,
      address: address,
      telefon: telefon
    }
    setPersonalDataSet(personalDataSet.concat(newItem));
    setFirstName("");
    setLastName("");
    setAddress("");
    setTelefon("");
  }

  const dataCards = personalDataSet.map((item) => (
    <PersonalDataCard
      key={item.id}
      id={item.id}
      firstName={item.firstName}
      lastName={item.lastName}
      address={item.address}
      telefon={item.telefon}
      remove={handleRemove}
    />
  ));

  return (
    <main className="main">
      <div className="flex-container">
        <input type="button" value="Personal data" className="button" onClick={() => cahngeTab(0)}></input>
        <input type="button" value={'Data entries (' + personalDataSet.length + ')'} className="button" onClick={() => cahngeTab(1)}></input>
        <input type="button" value="Popup" className="button" onClick={() => togglePopup(true)}></input>
      </div>
      <br />
      <TabPanel index={0} activatedTab={activeTab}>
        <form onSubmit={handleSubmit}>
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
          <input type="submit" value="Submit" className="button" />
        </form>
      </TabPanel>
      <TabPanel index={1} activatedTab={activeTab}>
        {dataCards}
      </TabPanel>
      {popupVisible && <Popup text="Popup content" closePopup={togglePopup}/>}
    </main>
  );
}

export default Main;
