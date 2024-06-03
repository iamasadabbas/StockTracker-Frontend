
import { combineReducers } from 'redux';
import { requestReducer,productQuantityReducer,requestedProductReducer,currentRequestReducer} from '../reducer/requestReducer';
import { demandReducer,allProductReducer,allLocationReducer,allDemandReducer} from '../reducer/demandReducer';
import { addRoleReducer,getAllRoleReducer } from '../reducer/roleReducer';
import {addTaskReducer} from '../reducer/taskReducer';
import { productReducer } from '../reducer/productReducer';
import { userReducer } from '../reducer/userReducer';
import { addDesignationReducer } from '../reducer/addDesignationReducer';
import { addSignatureRecordReducer } from '../reducer/signatureRecordReducer';
import { dashboardReducer } from '../reducer/dashboardReducer';
import { allRegistrationApproval } from '../reducer/registrationApprovalReducer';
import {userDataReducer,profileReducer} from '../reducer/userDataReducer'

export const rootReducer = combineReducers({
    requests:requestReducer,
    quantity:productQuantityReducer,
    requestedProduct:requestedProductReducer,
    demandReducer:demandReducer,
    allProduct:allProductReducer,
    allLocation:allLocationReducer,
    allDemand:allDemandReducer,
    addRole:addRoleReducer,
    allRole:getAllRoleReducer,
    addTask:addTaskReducer,
    product:productReducer,
    user:userReducer,
    dasignation:addDesignationReducer,
    signatureRecord:addSignatureRecordReducer,
    dashboard:dashboardReducer,
    allRegistration:allRegistrationApproval,
    currentRequest:currentRequestReducer,
    userData:userDataReducer,
    profile:profileReducer
});