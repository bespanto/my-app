import React, { useState } from "react";
import RequestCard from "./RequestCard";
import requestData from "./requestData";
import shortid from 'shortid';

function Main(props) {

  const [requests, setRequests] = useState(requestData);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [request, setRequest] = useState("");

  function handleRemove(e, id) {
    e.preventDefault();
    let arr = [...requests];
    console.log(arr);
    let filteredArray = arr.filter(item => item.id !== id);
    console.log(filteredArray);
    setRequests(filteredArray);
    console.log(requests);
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
    console.log("A name was submitted: " + firstName);
    event.preventDefault();
    const index = shortid.generate()
    setRequests(
      requests.concat(
        {
          id: index,
          firstName: firstName,
          lastName: lastName,
          age: age,
          request: request
        }
      )
    );
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
    <div>
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
      {requestCards}
    </div>
  );
}

export default Main;
