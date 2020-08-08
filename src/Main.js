import React, { useState } from "react";
import RequestCard from "./RequestCard";
import requestData from "./requestData";
import "./App.css";

function Main(props) {

  function handleRemove(e, id) {
    e.preventDefault();
    let arr = [...requests];
    console.log({arr});
    let filteredArray = arr.filter(item => item.props.id !== id);
    console.log({filteredArray});
    setRequests(filteredArray);
  }

  const req = requestData.map((item) => (
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



  function handleSubmit(event) {
    console.log("A name was submitted: " + firstName);
    event.preventDefault();
    const index = requests.length + 1;
    setRequests(
      requests.concat(
        <RequestCard
          key={index}
          id={index}
          firstName={firstName}
          lastName={lastName}
          age={age}
          request={request}
          remove={handleRemove}
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
      {/* <button onClick={(e) => handleRemove(e, 0)}>Remove</button> */}
      {requests}
    </div>
  );
}

export default Main;
