import { createSlice } from '@reduxjs/toolkit'

// selectors
export const selectUiState = (state) => state.uiState

export const initialState = {
        activeMenuItem: 0
    }

//slice
export const uiStateSlice = createSlice({
    name: "uiState",
    initialState: initialState,
    reducers: {
        setActiveMenuItem: (state, action) => {
            console.log(action.payload)
            state.activeMenuItem = action.payload;
        }
    }
})

export const { setActiveMenuItem } = uiStateSlice.actions;