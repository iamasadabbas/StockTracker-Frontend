import React, { useState, useEffect, Fragment } from 'react';
import './AddRole.css'
import { addRole,clearError } from '../../actions/roleAction';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';

export default function Role() {
  const alert=useAlert()
  const dispatch=useDispatch();
  const {loading,message,error}=useSelector(state=>state.addRole)
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
        dispatch(addRole(roleInput,descriptionInput ))
        setRoleInput('');
      setDesignationInput('');
       
    }
    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearError());
      }
      if(message){
        alert.success(message);
      }
    },[error,message])
    return (
        <Fragment>
          {
            loading ?(<Loader/>):(
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
        </Fragment>
    )
}

