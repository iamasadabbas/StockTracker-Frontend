import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TbLogout } from "react-icons/tb";
import { logout } from '../../../actions/userDataAction';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';


const Header = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const baseUrl = process.env.REACT_APP_BASE_URL; 
    const { loading1, isAuthenticated, user } = useSelector((state) => state.userData);
    // console.log(user.avatar);
    const handleLogout = async () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me out!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(logout());
          Swal.fire({
            title: "Logged Out!",
            text: "You have been logged out successfully.",
            icon: "success"
          });
          navigate('/login');
        }
      });
    };
    
  return (
    <div className="header-container">
      <div className='headerProfile-div' >
      <h3>{user?.name}</h3>
      {user && user?.avatar ? (
        <img 
          className='Profile-img'
          src={`${baseUrl}/${user?.avatar}`}
          alt='User Avatar'
          onClick={()=>navigate('/profile')}
        />
      ) : (
        <img 
          className='Profile-img'
          src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1717397192~exp=1717397792~hmac=66807edf7bf439c218076af2859290a128a51314641557c76cffdcd8fc45af9a'
          alt='Default Avatar'
          onClick={()=>navigate('/profile')}
        />

      )}
      <TbLogout className='Logout-btn' onClick={handleLogout}/>
      </div>
    </div>
  )
}

export default Header
