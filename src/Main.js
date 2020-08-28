import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PersonalDataCard from "./PersonalDataCard";
import PersonalDataForm from "./PersonalDataForm";
import ChartPanel from "./ChartPanel";
import TabPanel from "./TabPanel";
import "./App.css";
import * as PersonalDataSlice from "./redux/PersonalDataSlice";

function Main(props) {
  const personalData = useSelector((state) => PersonalDataSlice.selectPersonalData(state))
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  function cahngeTab(index) {
    setActiveTab(index);
  }

  function handleRemove(e, id) {
    e.preventDefault();
    dispatch(PersonalDataSlice.removePersonalData(id));
  }

  function handleSubmit(event, formData) {
    event.preventDefault()
    const newItem = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      telefon: formData.telefon
    }
    dispatch(PersonalDataSlice.addPersonalData(newItem));
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
        <PersonalDataForm
          submitButtonValue="Add"
          handleSubmit={handleSubmit} />
      </TabPanel>
      <TabPanel index={2} activatedTab={activeTab}>
        <ChartPanel />
      </TabPanel>
    </main>
  );
}

export default Main;
