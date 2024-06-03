import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux'

const Header = () => {
    const baseUrl = "http://localhost:4000"; 
    const { loading1, isAuthenticated, user } = useSelector((state) => state.userData);
    // console.log(user.avatar);
  return (
    <div className="header-container">
      <h4>{user.name}</h4>
      {user && user.avatar ? (
        <img
          className='Profile-img'
          src={`http://localhost:4000/${user.avatar}`}
          alt='User Avatar'
        />
      ) : (
        <img
          className='Profile-img'
          src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1717397192~exp=1717397792~hmac=66807edf7bf439c218076af2859290a128a51314641557c76cffdcd8fc45af9a'
          alt='Default Avatar'
        />
      )}
    </div>
  )
}

export default Header
