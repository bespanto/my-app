import React, { useState } from "react";
import Request from "./Request";
import requestData from "./requestData";
import "./App.css";

function Main(props) {
  const req = requestData.map((item) => (
    <Request
      key={item.id}
      id={item.id}
      firstName={item.firstName}
      lastName={item.lastName}
      age={item.age}
      request={item.request}
      // remove={handleRemove}
    />
  ));

  const [requests, setRequests] = useState(req);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [request, setRequest] = useState("");

  
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

  function handleRemove(id) {
    console.log(`remove ${id}`);
    let arr = [...requests];
    arr.splice(id, 1);
    setRequests(arr);
  }

  function handleSubmit(event) {
    console.log("A name was submitted: " + firstName);
    event.preventDefault();
    setRequests(
      requests.concat(
        <Request
          key={requests.lastIndexOf++}
          id={requests.lastIndexOf++}
          firstName={firstName}
          lastName={lastName}
          age={age}
          request={request}
          // remove={handleRemove}
        />
      )
    );
  }

  return (
    <div className="Box">
      <h1>Incoming requests: {requests.length}!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First name:
          <input
            name="firstName"
            type="text"
            value={firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last name:
          <input
            name="lastName"
            type="text"
            value={lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input name="age" type="number" value={age} onChange={handleChange} />
        </label>
        <br />
        <label>
          Request:
          <input
            name="request"
            type="text"
            value={request}
            onChange={handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <button onClick={(e) => handleRemove(0)}>Remove</button>
      {requests}
    </div>
  );
}

export default Main;
