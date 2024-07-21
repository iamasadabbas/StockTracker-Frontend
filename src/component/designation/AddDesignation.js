import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';
import { clearMessage, clearError, addDesignation } from '../../actions/designationAction';
import { useNavigate } from 'react-router-dom';

export default function AddDesignation() {
    const navigate=useNavigate()
    const alert = useAlert();
    const dispatch = useDispatch();
    const [nameInput, setNameInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const { loading, error, message } = useSelector((state) => state.designation);

    const handleNameChange = (e) => {
        setNameInput(e.target.value);
    };

    const handleDesriptionChange = (e) => {
        setDescriptionInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addDesignation(nameInput, descriptionInput));
        setNameInput('')
        setDescriptionInput('')
        navigate('/designation')
    };
    const handleViewDesignationClick =()=>{
        navigate('/designation')
    }

    useEffect(() => {
        if (message) {
            alert.success(message);
            dispatch(clearMessage());
        } else if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [message, error]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <div className="main-page-container">
                    <div className="pageName_And_Button">
                        <h2 className="add-visa-type-title">Add Designation</h2>
                        <button className="button-yellow" onClick={handleViewDesignationClick}>View Designation</button>
                    </div>
                    <form className="input-bar" onSubmit={handleSubmit}>
                        <div className="input-container">
                            <div className="input-with-label">
                                <label className="required">Designation</label>
                                <input
                                    className="add-visa-type-input yellow_border"
                                    value={nameInput}
                                    onChange={handleNameChange}
                                    placeholder="Type designation here"
                                    required
                                />
                            </div>
                            <div className="input-with-label">
                                <label className="required">Description</label>
                                <input
                                    className="add-visa-type-input yellow_border"
                                    value={descriptionInput}
                                    onChange={handleDesriptionChange}
                                    placeholder="Type description here"
                                    required
                                />
                            </div>
                        </div>
                        <div className="clear-and-Add-button-container">
                            <button type="button" onClick={() => { setNameInput(''); setDescriptionInput(''); }} className="clear-And-Add-Record-button">
                                Clear
                            </button>
                            <button type="submit" className="clear-And-Add-Record-button">
                                Add Record
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </Fragment>
    );
}
