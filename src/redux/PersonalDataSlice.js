import { createSlice, createAction } from '@reduxjs/toolkit'
import shortid from 'shortid';

//actions
export const editPersonalData = createAction(
    "personalData/editPersonalData",
    (obj) => {
        return {
            payload: {
                obj
            }
        };
    }
);

export const removePersonalData = createAction(
    "personalData/removePersonalData",
    (id) => {
        return {
            payload: {
                id
            }
        };
    }
);

export const addPersonalData = createAction(
    "personalData/addPersonalData",
    (obj) => {
        return {
            payload: {
                obj
            }
        };
    }
);


// selectors
export const selectPersonalData = (state) => state.personalData

export const initialState =[
    {
        key: shortid.generate(), 
        id: shortid.generate(),
        firstName: "Bob",
        lastName: "Trump",
        address: "Bolzmannstr 32, 15983 Niemandsdorf",
        telefon: "0176 342 766 22"
    },
    {
        key: shortid.generate(),
        id: shortid.generate(),
        firstName: "Maria",
        lastName: "Dorsch",
        address: "Bolzmannstr 32, 33377 Holzhausen",
        telefon: "0153 554 783 43"
    }
]

//slice
export const personalDataSlice = createSlice({
    name: "personalData",
    initialState: initialState,
    reducers: {
        editPersonalData: (state, action) => {
            const obj = action.payload;
            console.log(obj);
            console.log(state);
            state.forEach(item => {
                if (item.id === obj.id)
                    item.firstName = obj.firstName;
                item.lastName = obj.lastName;
                item.address = obj.address;
                item.telefon = obj.telefon;
            });
        },
        removePersonalData: (state, action) => {
            const id = {...action.payload};
            state.filter((item) => item.id !== id);
        },
        addPersonalData: (state, action) => {
            const obj = action.payload;
            console.log(obj)
            state.push(obj);
        }
    }
})