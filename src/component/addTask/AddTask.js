import React, { useState, useEffect, Fragment } from 'react';
import {addTask, clearError} from '../actions/addTaskAction'
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';

export default function AddTask() {
  const dispatch=useDispatch()
  const alert = useAlert();
    const [taskInput, setTaskInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const {loading,message,error}=useSelector((state)=>state.addTask)

    const handleTaskChange = (e) => {
        setTaskInput(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescriptionInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
          dispatch(addTask(taskInput,descriptionInput))
    }
    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearError())
      }else if(message){
        alert.success(message);
      }
    },[error,message])
    return (
        <Fragment>
          {
            loading ?(
              <Loader/>
            ):(
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
        </Fragment>
    )
}

