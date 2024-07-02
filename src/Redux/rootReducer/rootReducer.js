
import { combineReducers } from 'redux';
import { requestReducer,productQuantityReducer,requestedProductReducer,currentRequestReducer} from '../reducer/requestReducer';
import { demandReducer,allProductReducer,allLocationReducer,allDemandReducer} from '../reducer/demandReducer';
import { roleReducer } from '../reducer/roleReducer';
import {addTaskReducer} from '../reducer/taskReducer';
import { productReducer } from '../reducer/productReducer';
import { userReducer } from '../reducer/userReducer';
import { designationReducer } from '../reducer/designationReducer';
import { addSignatureRecordReducer } from '../reducer/signatureRecordReducer';
import { dashboardReducer } from '../reducer/dashboardReducer';
import { allRegistrationApproval } from '../reducer/registrationApprovalReducer';
import {userDataReducer,forgotPasswordReducer,profileReducer} from '../reducer/userDataReducer'
import { companyReducer } from '../reducer/companyReducer';

export const rootReducer = combineReducers({
    requests:requestReducer,
    quantity:productQuantityReducer,
    requestedProduct:requestedProductReducer,
    demandReducer:demandReducer,
    allProduct:allProductReducer,
    allLocation:allLocationReducer,
    allDemand:allDemandReducer,
    role:roleReducer,
    addTask:addTaskReducer,
    product:productReducer,
    user:userReducer,
    designation:designationReducer,
    signatureRecord:addSignatureRecordReducer,
    dashboard:dashboardReducer,
    allRegistration:allRegistrationApproval,
    // currentRequest:currentRequestReducer,
    userData:userDataReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    company:companyReducer
});