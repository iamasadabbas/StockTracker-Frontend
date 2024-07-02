import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import SideBar from '../component/Layout/Siderbar/Sidebar.js';
import Loader from '../component/Loader/Loader.js';
import ProtectedRoute from '../routes/ProtectedRoute.js';
import MainDashboard from '../component/dashboard/mainDashboard/mainDashboard.js';
import Request from '../component/Request/Request.js';
import AddDemandProduct from '../component/demand/addProductToDemand/AddDemandProduct.js';
import Demand from '../component/demand/demandPage/demand.js';
import ViewDemandPage from '../component/demand/viewDemand/ViewDemandPage.js';
import TemplatePrint from '../component/demand/printTemplate/TemplatePrint.js';
import Role from '../component/role/Role/Role.js';
import RoleTaskEdit from '../component/role/EditRoleTask/RoleTaskEdit.js';
import EditTask from '../component/role/EditRoleTask/EditTask.js';
import AddTask from '../component/task/AddTask.js';
import Products from '../component/product/AddProduct/Products.js';
import AddProduct from '../component/product/AddProduct/AddProduct.js'
import ProductType from '../component/product/ProductType/ProductType.js';
import AddUser from '../component/user/AddUser/AddUser.js';
import ViewUser from '../component/user/ViewUser/ViewUser.js';
import AddDesignation from '../component/designation/AddDesignation.js';
import AddSignatureRecord from '../component/signatureRecord/AddSignatureRecord/AddSignatureRecord.js';
import { ViewSignatureRecord } from '../component/signatureRecord/ViewSignatureRecord/ViewSignatureRecord.js';
import RegistrationApproval from '../component/registrationApproval/RegistrationApproval.js';
import UserStatus from '../component/userStatus/UserStatus.js';
import Login from '../component/login/Login.js';
import Header from '../component/Layout/Header/Header.js';
import Profile from '../component/Profile/Profile.js';
import './Navigation.css'
import UpdateProfile from '../component/Profile/UpdateProfile.js';
import ViewProduct from '../component/product/ViewProduct/ViewProduct.js';
import ForgotPassword from '../component/Profile/ForgotPassword.js'
import UpdatePassword from '../component/Profile/UpdatePassword.js';
import AllComapny from '../component/company/AllCompany.js';
import AddCompany from '../component/company/AddCompany.js';
import Test from '../component/test.js'
import Test1 from '../component/test1.js'
import AddRole from '../component/role/Role/AddRole.js';
import Task from '../component/task/Task.js';
import AddProductType from '../component/product/ProductType/AddProductType.js';
import Designation from '../component/designation/Designation.js'

export default function Navigation() {
  const navigate = useNavigate();
  const { loading1, isAuthenticated, user } = useSelector((state) => state.userData);


  if (loading1 || isAuthenticated === undefined) {
    return <Loader />;
  }

  return (
    <>
      <SideBar role={user?.role_id?.name}>
        <div className='Header-main'>
          <Header />
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/changePassword" element={<UpdatePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/company" element={<ProtectedRoute component={AllComapny} role={'StoreKeeper'} />} />
          <Route path="/test" element={<ProtectedRoute component={Test} role={'StoreKeeper'} />} />
          <Route path="/test1" element={<ProtectedRoute component={Test1} role={'StoreKeeper'} />} />
          <Route path="/addcompany" element={<ProtectedRoute component={AddCompany} role={'StoreKeeper'} />} />
          <Route path="/" element={<ProtectedRoute component={MainDashboard} role={'StoreKeeper'} />} />
          <Route path="/requests" element={<ProtectedRoute component={Request} role={'StoreKeeper'} />} />
          <Route path="/demandproduct" element={<ProtectedRoute component={AddDemandProduct} role={'StoreKeeper'} />} />
          <Route path="/demand" element={<ProtectedRoute component={Demand} role={'StoreKeeper'} />} />
          <Route path="/viewDemand" element={<ProtectedRoute component={ViewDemandPage} role={'StoreKeeper'} />} />
          <Route path="/templatePrint" element={<ProtectedRoute component={TemplatePrint} role={'StoreKeeper'} />} />
          <Route path="/role" element={<ProtectedRoute component={Role} role={'Admin'} />} />
          <Route path="/addProductType" element={<ProtectedRoute component={AddProductType} role={'Admin'} />} />
          <Route path="/addrole" element={<ProtectedRoute component={AddRole} role={'Admin'} />} />
          <Route path="/roletaskedit" element={<ProtectedRoute component={RoleTaskEdit} role={'Admin'} />} />
          <Route path="/editTask" element={<ProtectedRoute component={EditTask} role={'Admin'} />} />
          <Route path="/addTask" element={<ProtectedRoute component={AddTask} role={'Admin'} />} />
          <Route path="/task" element={<ProtectedRoute component={Task} role={'Admin'} />} />
          <Route path="/products" element={<ProtectedRoute component={Products} role={'StoreKeeper'} />} />
          <Route path="/addproduct" element={<ProtectedRoute component={AddProduct} role={'StoreKeeper'} />} />
          <Route path="/availableproduct" element={<ProtectedRoute component={ViewProduct} role={'StoreKeeper'} />} />
          <Route path="/producttype" element={<ProtectedRoute component={ProductType} role={'StoreKeeper'} />} />
          <Route path="/adduser" element={<ProtectedRoute component={AddUser} role={'Admin'} />} />
          <Route path="/viewuser" element={<ProtectedRoute component={ViewUser} role={'Admin'} />} />
          <Route path="/adddesignation" element={<ProtectedRoute component={AddDesignation} role={'Admin'} />} />
          <Route path="/designation" element={<ProtectedRoute component={Designation} role={'Admin'} />} />
          <Route path="/addSignatureRecord" element={<ProtectedRoute component={AddSignatureRecord} role={'StoreKeeper'} />} />
          <Route path="/viewSignatureRecord" element={<ProtectedRoute component={ViewSignatureRecord} role={'StoreKeeper'} />} />
          <Route path="/registrationApproval" element={<ProtectedRoute component={RegistrationApproval} role={'Admin'} />} />
          <Route path="/userStatus" element={<ProtectedRoute component={UserStatus} role={'Admin'} />} />
        </Routes>
      </SideBar>
    </>
  );
}
