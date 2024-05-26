// store.js

import { configureStore } from '@reduxjs/toolkit'; // Recommended for simplified setup
import {rootReducer} from './component/Redux/rootReducer/rootReducer'; // Import your combined reducers (explained later)// Import your root reducer

const store = configureStore({
    reducer: rootReducer,
});

export default store;
