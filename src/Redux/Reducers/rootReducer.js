// rootReducer.js
import { combineReducers } from 'redux';
import {demandReducer} from './demandReducer'


const rootReducer = combineReducers({
    demandReducer
});

export default rootReducer;
