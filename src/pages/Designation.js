import React, { useState, useEffect } from 'react';
import '../styles/AddRole.css'
import axios from 'axios';

const URL = process.env.BASE_URL ;
export default function Designation() {
    const [nameInput, setNameInput] = useState('');
    const [descriptionInput, setDesignationInput]=useState('');

    const handleNameChange = (e) => {
        setNameInput(e.target.value);
    };
    const handleDesriptionChange = (e) => {
        setDesignationInput(e.target.value);
    };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post(`${URL}/user/addDesignation`, { name: nameInput,description:descriptionInput });
        console.log(response);
        if (response.data.status === 200) {
            alert('Designation added successfully')
            setNameInput('')
            setDesignationInput('');
        }  else if(response.data.status ===409){
            alert('Designation already exists');
          }
        } catch (error) {
          if (error.response && error.response.status === 409) {
            alert('Designation already exists');
          } else {
            console.error('Error during registration:', error);
            alert('Error while registration');
          }
        }
    }
    return (
        <div>
            <h1 className='heading'>Add Designation Here</h1>
            <div className="login-container">

                <form onSubmit={handleSubmit}>
                    <label>Designation</label>
                    <input className='Input' value={nameInput} onChange={handleNameChange} placeholder='type Designation here' />
                    <input className='Input' value={descriptionInput} onChange={handleDesriptionChange} placeholder='type description here' />
                    <button className='login-button' type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

