import {createSlice} from "@reduxjs/toolkit";

const filterReducer = createSlice({
    name : 'filterInputs',
    initialState : '',
    reducers : {
        filterChange(state, action) {
            return state = action.payload
        },
    }
});

export const { filterChange } = filterReducer.actions
export default filterReducer.reducer;