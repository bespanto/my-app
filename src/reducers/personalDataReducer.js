import persData from "../personalDataSet";

// const obj = {
//   id: '',
//   firstName: "a",
//   lastName: "",
//   address: "",
//   telefon: ""
// }

const personalDataReducer = (state = persData, action) => {
  switch (action.type) {
    case 'CHANGE_PERSONAL_DATA':
      return state = action.payload;
    default:
      return state
  }
}

export default personalDataReducer;