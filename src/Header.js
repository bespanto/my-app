import React from 'react';

function Header(props) {

  function handleClickOnHeader() {
    console.log('Click on Header');
  }

  return (
    <div>
      <h1>Header line of App {props.appName}!</h1>
      <button onClick={handleClickOnHeader}>Click on Header</button>
    </div>
  );
}

export default Header;
