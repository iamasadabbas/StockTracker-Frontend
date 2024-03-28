import React, { useState, useEffect } from 'react';
import '../styles/AddRole.css'
import axios from 'axios';

const URL = process.env.BASE_URL || 'http://localhost:3000';
export default function Role() {
    const [roleInput, setRoleInput] = useState('');
    const [descriptionInput, setDesignationInput]=useState('');

    const handleRoleChange = (e) => {
        setRoleInput(e.target.value);
    };
    const handleDesriptionChange = (e) => {
        setDesignationInput(e.target.value);
    };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post(`${URL}/user/addRole`, { name: roleInput,description:descriptionInput });
        // console.log(response);
        if (response.status === 201) {
            alert('role added successfully')
            setRoleInput('')
            setDesignationInput('');
        }  else {
            alert('Error while registration');
          }
        } catch (error) {
          if (error.response && error.response.status === 409) {
            alert('Role already exists');
          } else {
            console.error('Error during registration:', error);
            alert('Error while registration');
          }
        }
    }
    return (
        <div>
            <h1 className='heading'>Add Role Here</h1>
            <div className="login-container">

                <form onSubmit={handleSubmit}>
                    <label>Role</label>
                    <input className='Input' value={roleInput} onChange={handleRoleChange} placeholder='type role here' />
                    <input className='Input' value={descriptionInput} onChange={handleDesriptionChange} placeholder='type description here' />
                    <button className='login-button' type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

