import { createSlice } from '@reduxjs/toolkit'
import shortid from 'shortid';

// selectors
export const selectPersonalData = (state) => state.personalData

export const initialState = [
    {
        id: shortid.generate(),
        firstName: "Bob",
        lastName: "Trump",
        address: "Bolzmannstr 32, 15983 Niemandsdorf",
        phone: "0176 342 766 22"
    },
    {
        id: shortid.generate(),
        firstName: "Maria",
        lastName: "Dorsch",
        address: "Bolzmannstr 32, 33377 Holzhausen",
        phone: "0153 554 783 43"
    }
]

//slice
export const personalDataSlice = createSlice({
    name: "personalData",
    initialState: initialState,
    reducers: {
        editPersonalData: (state, action) => {
            const obj = action.payload;
            state.forEach(item => {
                if (item.id === obj.id) {
                    item.firstName = obj.firstName;
                    item.lastName = obj.lastName;
                    item.address = obj.address;
                    item.phone = obj.phone;
                }
            });
        },
        removePersonalData: (state, action) => {
            const id = action.payload;
            state.splice(state.findIndex(item => item.id === id),1);
        },
        addPersonalData: (state, action) => {
            const obj = action.payload;
            obj.id = shortid.generate();
            state.push(obj);
        }
    }
})

export const { addPersonalData, removePersonalData, editPersonalData } = personalDataSlice.actions;