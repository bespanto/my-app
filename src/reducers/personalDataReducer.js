import persData from "../personalDataSet";

const personalDataReducer = (state = persData, action) => {
  switch (action.type) {
    case 'CHANGE_PERSONAL_DATA':{
      const obj = action.payload;
      let arr = [...state];
      arr.forEach(item => {
        if (item.id === obj.id)
          item.firstName = obj.firstName;
          item.lastName = obj.lastName;
          item.address = obj.address;
          item.telefon = obj.telefon;
      });
    
      console.log(arr);
      return state = arr;
    }
    case 'REMOVE_PERSONAL_DATA':{
        const id = action.payload;
        let arr = [...state];
        let filteredArray = arr.filter(item => item.id !== id);
        console.log(filteredArray);
        return state = filteredArray;
    }
    case 'ADD_PERSONAL_DATA':{
      const obj = action.payload;
      console.log(obj)
      let arr = [...state];
      arr.push(obj);
      console.log(arr);
      return state = arr;
  }
    default:
      return state
  }
}

export default personalDataReducer;