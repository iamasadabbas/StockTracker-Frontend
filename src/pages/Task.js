import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "./axiosInstance";
import axios from 'axios';

const URL = process.env.BASE_URL;


export default function Task() {
    const [taskInput, setTaskInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const navigate = useNavigate();

    const handleTaskChange = (e) => {
        setTaskInput(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescriptionInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

        
        const response = await axios.post(`${URL}/user/addTask`, { name:taskInput,description:descriptionInput });
        // console.log(response);
        if(response.status===200){
            alert('task added successfully')
            setTaskInput('')
            setDescriptionInput('')
          } else if(response.status === 404) {
            alert('Error while adding');
          }
        } catch (error) {
          if (error.response && error.response.status === 409) {
            alert('task already exists');
          } else {
            console.error('Error during registration:', error);
            alert('Error while registration');
          }
        }
    }
    return (
        <div >
            <h1 className='heading'>Add Task Here</h1>
        <div className="login-container">
            
            <form onSubmit={handleSubmit}>
                <label>Task</label>
                <input className='Input' value={taskInput}  onChange={handleTaskChange} placeholder='Add Task' />
                <input className='Input' value={descriptionInput}  onChange={handleDescriptionChange} placeholder='Add decription' />
                <button className='login-button' type='submit'>Add</button>
            </form>
        </div>
        </div>
    )
}

