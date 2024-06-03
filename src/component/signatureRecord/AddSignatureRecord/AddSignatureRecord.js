import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import { addSignatureRecord, clearMessage,clearError } from '../../../actions/signatureRecordAction';

export default function AddSignatureRecord() {
  const alert=useAlert()
  const dispatch=useDispatch();
  const {loading,message,error}=useSelector(state=>state.signatureRecord)
    const [nameInput, setnameInput] = useState('');
    const [designationInput, setDesignationInput]=useState('');

    const handlenameChange = (e) => {
        setnameInput(e.target.value);
    };
    const handleDesriptionChange = (e) => {
        setDesignationInput(e.target.value);
    };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addSignatureRecord(nameInput,designationInput ))
        setnameInput('');
      setDesignationInput('');
       
    }
    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearError());
      }
      if(message){
        alert.success(message);
        dispatch(clearMessage())
      }
    },[error,message])
    return (
        <Fragment>
          {
            loading ?(<Loader/>):(
              <div>
            <h1 className='heading'>Add signature record Here</h1>
            <div className="login-container">

                <form onSubmit={handleSubmit}>
                    {/* <label>name</label> */}
                    <input className='Input' value={nameInput} onChange={handlenameChange} placeholder='type name here' />
                    <input className='Input' value={designationInput} onChange={handleDesriptionChange} placeholder='type designation here' />
                    <button className='login-button' type='submit'>Add</button>
                </form>
            </div>
        </div>
            )
          }
        </Fragment>
    )
}

