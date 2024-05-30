import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import SideBar from './Layout/Siderbar/Sidebar.js';
import Loader from './Loader/Loader.js';
import ProtectedRoute from './routes/ProtectedRoute.js';
import MainDashboard from './dashboard/mainDashboard/mainDashboard.js';
import Request from './Request/Request.js';
import AddDemandProduct from './demand/addProductToDemand/AddDemandProduct.js';
import Demand from './demand/demandPage/demand.js';
import ViewDemandPage from './demand/viewDemand/ViewDemandPage.js';
import TemplatePrint from './demand/printTemplate/TemplatePrint.js';
import AddRole from './role/AddRole/AddRole.js';
import RoleTaskEdit from './role/EditRoleTask/RoleTaskEdit.js';
import EditTask from './role/EditRoleTask/EditTask.js';
import AddTask from './addTask/AddTask.js';
import AddProduct from './product/AddProduct/AddProduct.js';
import ProductType from './product/AddProductType/ProductType.js';
import AddUser from './user/AddUser/AddUser.js';
import ViewUser from './user/ViewUser/ViewUser.js';
import AddDesignation from './addDesignation/AddDesignation.js';
import AddSignatureRecord from './signatureRecord/AddSignatureRecord/AddSignatureRecord.js';
import { ViewSignatureRecord } from './signatureRecord/ViewSignatureRecord/ViewSignatureRecord.js';
import RegistrationApproval from './registrationApproval/RegistrationApproval.js';
import UserStatus from './userStatus/UserStatus.js';
import Login from './login/Login.js';

export default function Navigation() {
  const navigate = useNavigate();
  const { loading1, isAuthenticated, user } = useSelector((state) => state.userData);

  useEffect(() => {
    if (!loading1 && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading1, isAuthenticated, navigate]);

  if (loading1 || isAuthenticated === undefined) {
    return <Loader />;
  }

  return (
    <SideBar role={user?.role_id?.name}>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute component={MainDashboard} role={'StoreKeeper'} />} />
        <Route path="/requests" element={<ProtectedRoute component={Request} role={'StoreKeeper'} />} />
        <Route path="/demandproduct" element={<ProtectedRoute component={AddDemandProduct} role={'StoreKeeper'} />} />
        <Route path="/demand" element={<ProtectedRoute component={Demand} role={'StoreKeeper'} />} />
        <Route path="/viewDemand" element={<ProtectedRoute component={ViewDemandPage} role={'StoreKeeper'} />} />
        <Route path="/templatePrint" element={<ProtectedRoute component={TemplatePrint} role={'StoreKeeper'} />} />
        <Route path="/addrole" element={<ProtectedRoute component={AddRole} role={'Admin'} />} />
        <Route path="/roletaskedit" element={<ProtectedRoute component={RoleTaskEdit} role={'Admin'} />} />
        <Route path="/editTask" element={<ProtectedRoute component={EditTask} role={'Admin'} />} />
        <Route path="/addTask" element={<ProtectedRoute component={AddTask} role={'Admin'} />} />
        <Route path="/addproduct" element={<ProtectedRoute component={AddProduct} role={'StoreKeeper'} />} />
        <Route path="/producttype" element={<ProtectedRoute component={ProductType} role={'StoreKeeper'} />} />
        <Route path="/adduser" element={<ProtectedRoute component={AddUser} role={'Admin'} />} />
        <Route path="/viewuser" element={<ProtectedRoute component={ViewUser} role={'Admin'} />} />
        <Route path="/adddesignation" element={<ProtectedRoute component={AddDesignation} role={'Admin'} />} />
        <Route path="/addSignatureRecord" element={<ProtectedRoute component={AddSignatureRecord} role={'StoreKeeper'} />} />
        <Route path="/viewSignatureRecord" element={<ProtectedRoute component={ViewSignatureRecord} role={'StoreKeeper'} />} />
        <Route path="/registrationApproval" element={<ProtectedRoute component={RegistrationApproval} role={'StoreKeeper'} />} />
        <Route path="/userStatus" element={<ProtectedRoute component={UserStatus} role={'Admin'} />} />
      </Routes>
    </SideBar>
  );
}
