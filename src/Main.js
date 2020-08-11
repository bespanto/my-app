import React, { useState } from "react";
import RequestCard from "./RequestCard";
import TabPanel from "./TabPanel";
import requestData from "./requestData";
import shortid from 'shortid';
import "./App.css";

function Main(props) {

  const [requests, setRequests] = useState(requestData);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [request, setRequest] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  function cahngeTab(index) {
    console.log(`activatedTab: ${index}`)
    setActiveTab(index);
  }

  function handleRemove(e, id) {
    e.preventDefault();
    let arr = [...requests];
    let filteredArray = arr.filter(item => item.id !== id);
    setRequests(filteredArray);
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
      case "age":
        setAge(event.target.value);
        break;
      case "request":
        setRequest(event.target.value);
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
      age: age,
      request: request
    }
    setRequests(requests.concat(newItem));
    setFirstName("");
    setLastName("");
    setAge("");
    setRequest("");
  }

  const requestCards = requests.map((item) => (
    <RequestCard
      key={item.id}
      id={item.id}
      firstName={item.firstName}
      lastName={item.lastName}
      age={item.age}
      request={item.request}
      remove={handleRemove}
    />
  ));

  return (
    <main className="main">
      <div className="flex-container">
        <input type="button" value="Make request" className="button" onClick={() => cahngeTab(0)}></input>
        <input type="button" value={'Request list (' + requests.length + ')'} className="button" onClick={() => cahngeTab(1)}></input>
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
              Age:
            </div>
            <div className="grid-item">
              <input name="age" type="number" value={age} onChange={handleChange} />
            </div>
            <div className="grid-item">
              Request:
            </div>
            <div className="grid-item">
              <input
                name="request"
                type="text"
                value={request}
                onChange={handleChange}
              />
            </div>
          </div>
          <br />
          <input type="submit" value="Submit" className="button" />
        </form>
      </TabPanel>
      <TabPanel index={1} activatedTab={activeTab}>
        {requestCards}
      </TabPanel>
    </main>
  );
}

export default Main;
