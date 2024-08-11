import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "../component/Layout/Siderbar/Sidebar.js";
import Loader from "../component/Loader/Loader.js";
import ProtectedRoute from "../routes/ProtectedRoute.js";
import MainDashboard from "../component/dashboard/mainDashboard/mainDashboard.js";
import Request from "../component/Request/Request.js";
import AddDemandProduct from "../component/demand/addProductToDemand/AddDemandProduct.js";
import Demand from "../component/demand/demandPage/demand.js";
import ViewDemandPage from "../component/demand/viewDemand/ViewDemandPage.js";
import TemplatePrint from "../component/demand/printTemplate/TemplatePrint.js";
import Role from "../component/role/Role/Role.js";
import RoleTaskEdit from "../component/role/EditRoleTask/RoleTaskEdit.js";
import EditTask from "../component/role/EditRoleTask/EditTask.js";
import AddTask from "../component/task/AddTask.js";
import Products from "../component/product/AddProduct/Products.js";
import AddProduct from "../component/product/AddProduct/AddProduct.js";
import ProductType from "../component/product/ProductType/ProductType.js";
import AddUser from "../component/user/AddUser/AddUser.js";
import NotFound from "../component/notfound/NotFound.js";
import ViewUser from "../component/user/ViewUser/ViewUser.js";
import AddDesignation from "../component/designation/AddDesignation.js";
import AddSignatureRecord from "../component/signatureRecord/AddSignatureRecord/AddSignatureRecord.js";
import RegistrationApproval from "../component/registrationApproval/RegistrationApproval.js";
import UserStatus from "../component/userStatus/UserStatus.js";
import Login from "../component/login/Login.js";
import Header from "../component/Layout/Header/Header.js";
import Profile from "../component/Profile/Profile.js";
import UpdateProfile from "../component/Profile/UpdateProfile.js";
import ViewProduct from "../component/product/ViewProduct/ViewProduct.js";
import UpdatePassword from "../component/Profile/UpdatePassword.js";
import AllComapny from "../component/company/AllCompany.js";
import AddCompany from "../component/company/AddCompany.js";
import AddRole from "../component/role/Role/AddRole.js";
import Task from "../component/task/Task.js";
import AddProductType from "../component/product/ProductType/AddProductType.js";
import Designation from "../component/designation/Designation.js";
import ReactTable from "../component/ReactTable.js";
import { ViewSignatureRecord } from "../component/signatureRecord/ViewSignatureRecord/ViewSignatureRecord.js";
import "./Navigation.css";

export default function Navigation() {
  const navigate = useNavigate();
  const { loading1, isAuthenticated, user, roleTask } = useSelector(
    (state) => state.userData
  );

  if (loading1 || isAuthenticated === undefined) {
    return <Loader />;
  }

  const renderRoute = (path, Component, taskName) => {
    const task = roleTask.find(
      (task) => task?.task_id?.name === taskName && task.status === true
    );

    return task ? (
      <Route path={path} element={<ProtectedRoute component={Component} />} />
    ) : (
      <Route path={path} element={<NotFound />} />
    );
  };

  return (
    <>
      <SideBar role={user?.role_id?.name}>
        <div className="Header-main">
          <Header />
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/changePassword" element={<UpdatePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/" element={<MainDashboard />} />

          {renderRoute("/company", AllComapny, "View Product Company")}
          {renderRoute("/addcompany", AddCompany, "Add Product Company")}
          {renderRoute("/requests", Request, "View Product Request")}
          {renderRoute(
            "/demandproduct",
            AddDemandProduct,
            "Add Product Demand"
          )}
          {renderRoute("/demand", Demand, "Add Product Demand")}
          {renderRoute("/viewDemand", ViewDemandPage, "View Product Demand")}
          {renderRoute("/templatePrint", TemplatePrint, "Print Template")}
          {renderRoute("/addProductType", AddProductType, "Add Product Type")}
          {renderRoute("/role", Role, "View User Role")}
          {renderRoute("/addrole", AddRole, "Add User Role")}
          {renderRoute("/roletaskedit", RoleTaskEdit, "Role Task Edit")}
          {renderRoute("/editTask", EditTask, "Role Task Edit")}
          {renderRoute("/addTask", AddTask, "Add Role Task")}
          {renderRoute("/task", Task, "View Role Task")}
          {renderRoute("/products", Products, "View Product")}
          {renderRoute("/addproduct", AddProduct, "Add Product")}
          {renderRoute("/availableproduct", ViewProduct, "View Product")}
          {renderRoute("/producttype", ProductType, "View Product Type")}
          {renderRoute("/viewuser", ViewUser, "View User")}
          {renderRoute(
            "/adddesignation",
            AddDesignation,
            "Add User Designation"
          )}
          {renderRoute("/designation", Designation, "View User Designation")}
          {renderRoute(
            "/addSignatureRecord",
            AddSignatureRecord,
            "Add Signature Record"
          )}
          {renderRoute(
            "/viewSignatureRecord",
            ViewSignatureRecord,
            "View Signature Record"
          )}
          {renderRoute(
            "/registrationApproval",
            RegistrationApproval,
            "User Approval"
          )}
          {renderRoute("/userStatus", UserStatus, "User Status")}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SideBar>
    </>
  );
}
