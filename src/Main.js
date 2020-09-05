import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { postData } from './serverConnections/connect'
import PersonalDataCard from "./PersonalDataCard";
import PersonalDataForm from "./PersonalDataForm";
import ChartPanel from "./ChartPanel";
import TabPanel from "./TabPanel";
import Month from "./Month";
import "./App.css";
import * as PersonalDataSlice from "./redux/PersonalDataSlice";
import * as UiStateSlice from "./redux/UiStateSlice";

function Main(props) {
  const personalData = useSelector((state) => PersonalDataSlice.selectPersonalData(state))
  const uiState = useSelector((state) => UiStateSlice.selectUiState(state))
  const dispatch = useDispatch();

  function handleRemove(e, id) {
    e.preventDefault();
    dispatch(PersonalDataSlice.removePersonalData(id));
  }

  function handleAdd(event, formData) {
    event.preventDefault()
    const newItem = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      phone: formData.phone
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
      phone={item.phone}
      remove={handleRemove}
    />
  ));


  return (
    <main >
      <div className="position-relative overflow-hidden">
        <TabPanel index={0} activatedTab={uiState.activeMenuItem}>
          <Month />
        </TabPanel>
        <TabPanel index={1} activatedTab={uiState.activeMenuItem}>
          {dataCards}
        </TabPanel>
        <TabPanel index={2} activatedTab={uiState.activeMenuItem}>
          <PersonalDataForm
            submitButtonValue="Add"
            handleSubmit={handleAdd} />
        </TabPanel>
        <TabPanel index={3} activatedTab={uiState.activeMenuItem}>
          <ChartPanel />
        </TabPanel>
      </div>
    </main>
  );
}

export default Main;
