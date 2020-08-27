import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PersonalDataCard from "./PersonalDataCard";
import ChartPanel from "./ChartPanel";
import TabPanel from "./TabPanel";
import shortid from 'shortid';
import "./App.css";
import * as PersonalDataSlice from "./redux/PersonalDataSlice";


function Main(props) {
  const personalData = useSelector((state) => PersonalDataSlice.selectPersonalData(state))
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [telefon, setTelefon] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  function cahngeTab(index) {
    setActiveTab(index);
  }

  function handleRemove(e, id) {
    e.preventDefault();
    dispatch(PersonalDataSlice.removePersonalData(id));
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

  function handleSubmit(event) {
    event.preventDefault();
    const index = shortid.generate();
    const newItem = {
      key: index,
      id: index,
      firstName: firstName,
      lastName: lastName,
      address: address,
      telefon: telefon
    }
    dispatch(PersonalDataSlice.addPersonalData(newItem));
    console.log(personalData);
    setFirstName("");
    setLastName("");
    setAddress("");
    setTelefon("");
  }

  const dataCards = personalData.map((item) => (
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
    <main className="flex-container-column">
      <div className="index-tab-container">
        <div className={activeTab === 0 ? 'index-tab' : ''}>
          <input type="button" value={'Entries (' + personalData.length + ')'} className={activeTab === 0 ? 'button active' : 'button'} onClick={() => cahngeTab(0)}></input>
        </div>
        <div className={activeTab === 1 ? 'index-tab' : ''}>
          <input type="button" value="Add entry" className={activeTab === 1 ? 'button active' : 'button'} onClick={() => cahngeTab(1)}></input>
        </div>
        <div className={activeTab === 2 ? 'index-tab' : ''}>
          <input type="button" value="Charts" className={activeTab === 2 ? 'button active' : 'button'} onClick={() => cahngeTab(2)}></input>
        </div>
      </div>
      <TabPanel index={0} activatedTab={activeTab}>
        {dataCards}
      </TabPanel>
      <TabPanel index={1} activatedTab={activeTab}>
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
      <TabPanel index={2} activatedTab={activeTab}>
        <ChartPanel />
      </TabPanel>
    </main>
  );
}

export default Main;
