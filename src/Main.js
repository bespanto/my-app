import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { postData } from './serverConnections/connect'
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
  const [error, setError] = useState('');

  function cahngeTab(index) {
    setActiveTab(index);
  }

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
    sendEntryToBackend(newItem);
  }

  function sendEntryToBackend(item) {
    postData('http://localhost:8000/bussinesCards', item)
      .then(response => {
        if (response.ok)
          return response.json()
        else
          throw response
      })
      .then(data => {
        if (data.errors) {
          console.error(data.errors)
          for (let k of Object.keys(data.errors)) {
            console.error(k + ': ' + data.errors[k].message);
            setErrorTemporally('[err]');
          }

        }
        else {
          console.log(data);
        }
      })
      .catch(() => setErrorTemporally('Can\'t save data in backend'));
  }



  async function setErrorTemporally(error){
    setError(error);
    window.setTimeout(()=> setError(''), 3000);
  }


  function syncAll() {
    console.log(personalData);
    personalData.forEach(
      item => {
        sendEntryToBackend(item);
      }
    )
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
        <div className="menu">
          <div className="menu-left">
            <span className={error === '' ? '' : 'hidden'} >{error}</span>
          </div>
          <div className="menu-right">
            <input type="button" value="Sync" className="button" onClick={() => syncAll()}></input>
          </div>
        </div>
        {dataCards}
      </TabPanel>
      <TabPanel index={1} activatedTab={activeTab}>
        <PersonalDataForm
          submitButtonValue="Add"
          handleSubmit={handleAdd} />
      </TabPanel>
      <TabPanel index={2} activatedTab={activeTab}>
        <ChartPanel />
      </TabPanel>
    </main>
  );
}

export default Main;
