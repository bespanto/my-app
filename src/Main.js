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

  function handleAdd(event, formData) {
    event.preventDefault()
    const newItem = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      phone: formData.phone
    }
    dispatch(PersonalDataSlice.addPersonalData(newItem));

    // save data on backed
    postData('http://localhost:8000/bussinesCards', newItem)
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
          }
        }
        else
          console.log(data)

      }) // parses JSON response into native JavaScript objects
      .catch(response => console.error('Not saved ' + response.status + ': ' + response.statusText));
  }

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return response;
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
