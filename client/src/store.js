import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducer'

const store = configureStore({reducer: rootReducer, devTools: false});

export default store;

