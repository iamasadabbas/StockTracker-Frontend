import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDesignation } from '../actions/addDesignationAction';
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';
import { clearMessage } from '../actions/addDesignationAction';
import { clearError } from '../actions/addDesignationAction';
export default function AddDesignation() {
    const alert = useAlert()
    const dispatch = useDispatch()
    const [nameInput, setNameInput] = useState('');
    const [descriptionInput, setDesignationInput] = useState('');
    const { loading, error, message } = useSelector((state) => state.dasignation)

    const handleNameChange = (e) => {
        setNameInput(e.target.value);
    };
    const handleDesriptionChange = (e) => {
        setDesignationInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addDesignation(nameInput, descriptionInput))
    }

    useEffect(() => {
        if (message) {
            alert.success(message);
            dispatch(clearMessage())

        } else if (error) {
            alert.error(error);
            dispatch(clearError())
        }
    }, [message, error])
    return (
        <Fragment>
            {
                loading ? (
                    <Loader />
                ) : (
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
        </Fragment>
    )
}

