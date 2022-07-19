import { configureStore } from '@reduxjs/toolkit'
import reducer from "./reducers/anecdoteReducer";
import notifications from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";

export const store = configureStore({
    reducer: {
        anecdotes: reducer,
        notifications : notifications,
        filterInputs : filterReducer
    }
})

export default store