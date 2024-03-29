import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login.js';
import AddUser from './pages/AddUser.js';
import Home from './pages/Home.js';
import AddRole from './pages/AddRole.js';
import RoleTaskEdit from './pages/RoleTaskEdit.js';
import Task from './pages/Task.js';
import EditPage from './pages/EditPage.js';
import Navbar from './components/Navbar.js';
import ProductType from './pages/ProductType.js';
import ProductCompany from './pages/ProductCompany.js';
import Product from './pages/Product.js';
import Designation from './pages/Designation.js';
import Test from './pages/Test.js';
import ViewUser from './pages/ViewUser.js';
import SideBar from './components/Sidebar.js';

function App() {
  return (
    <Router>
      <SideBar>
      <div className='main-div'>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/adduser" element={<AddUser/>}/>
        <Route path="/addrole" element={<AddRole/>}/>
        <Route path="/roletaskedit" element={<RoleTaskEdit/>}/>
        <Route path="/addtask" element={<Task/>}/>
        <Route path="/editpage" element={<EditPage/>}/>
        <Route path="/producttype" element={<ProductType/>}/>
        <Route path="/productcompany" element={<ProductCompany/>}/>
        <Route path="/addproduct" element={<Product/>}/>
        <Route path="/adddesignation" element={<Designation/>}/>
        {/* <Route path="/test" element={<Test/>}/> */}
        <Route path="/viewuser" element={<ViewUser/>}/>
        </Routes>
      </div>
      </SideBar>
    </Router>
  );
}

export default App;