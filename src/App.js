import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import SideBar from './component/Layout/Siderbar/Sidebar.js'
import Request from './component/Request/Request.js';
import AddDemandProduct from './component/demand/addProductToDemand/AddDemandProduct.js'
import Demand from './component/demand/demandPage/demand.js'
import ViewDemandPage from './component/demand/viewDemand/ViewDemandPage.js';
import TemplatePrint from './component/demand/printTemplate/TemplatePrint.js';
import AddRole from './component/role/AddRole/AddRole.js'
import RoleTaskEdit from './component/role/EditRoleTask/RoleTaskEdit.js';
import EditTask from './component/role/EditRoleTask/EditTask.js'
import AddTask from './component/addTask/AddTask.js'
import AddProduct from './component/product/AddProduct/AddProduct.js'
import ProductType from './component/product/AddProductType/ProductType.js';
import AddUser from './component/user/AddUser/AddUser.js'
import ViewUser from './component/user/ViewUser/ViewUser.js';
import  AddDesignation  from './component/addDesignation/AddDesignation.js';
import AddSignatureRecord from './component/signatureRecord/AddSignatureRecord/AddSignatureRecord.js';
import { ViewSignatureRecord } from './component/signatureRecord/ViewSignatureRecord/ViewSignatureRecord.js';
import MainDashboard from './component/dashboard/mainDashboard/mainDashboard.js';

function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<MainDashboard/>}/>
          <Route path="/requests" element={<Request />} />
          <Route path="/demandproduct" element={<AddDemandProduct/>}/>
          <Route path="/demand" element={<Demand/>}/>
          <Route path="/viewDemand" element={<ViewDemandPage/>}/>
          <Route path="/templatePrint" element={<TemplatePrint/>}/>
          <Route path="/addrole" element={<AddRole/>}/>
          <Route path="/roletaskedit" element={<RoleTaskEdit/>}/>
          <Route path="/editTask" element={<EditTask/>}/>
          <Route path="/addTask" element={<AddTask/>}/>
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/producttype" element={<ProductType/>}/>
          <Route path="/adduser" element={<AddUser/>}/>
          <Route path="/viewuser" element={<ViewUser/>}/>
          <Route path="/adddesignation" element={<AddDesignation/>}/>
          <Route path="/addSignatureRecord" element={<AddSignatureRecord/>}/>
          <Route path="/viewSignatureRecord" element={<ViewSignatureRecord/>}/>

        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;