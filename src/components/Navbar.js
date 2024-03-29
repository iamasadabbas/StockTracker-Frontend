import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../styles/Navbar.css'


function Navbar() {
    return (
        <nav className='navbar'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/addrole">Add Role</Link></li>
                <li><Link to="/addtask">Add Task</Link></li>
                <li><Link to="/roletaskedit">Role Task Edit</Link></li>
                <li><Link to="/producttype">product type</Link></li>
                <li><Link to="/productcompany">product company</Link></li>
                <li><Link to="/adddesignation">AddDesignation</Link></li>
                <li><Link to="/addproduct">Add Product</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/adduser">AddUser</Link></li>
                <li><Link to="/viewuser">ViewUser</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
