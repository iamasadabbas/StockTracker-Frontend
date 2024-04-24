// store.js

import { configureStore } from '@reduxjs/toolkit'; // Recommended for simplified setup
import rootReducer from '../Reducers/rootReducer'; // Import your combined reducers (explained later)// Import your root reducer

const store = configureStore({
    reducer: rootReducer,
});


export default store;
