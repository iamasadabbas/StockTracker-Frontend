import React, { Fragment, useEffect, useState } from 'react';
import './Bar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DEMAND_DETAIL } from '../../Redux/constants/demandConstants';
import { getAllLocation } from '../../actions/demandAction'
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import { clearError } from '../../actions/demandAction';


function Bar({ print }) {
    const alert = useAlert()
    const dispatch = useDispatch();
    const { detail } = useSelector(state => state.demandReducer);
    const { loading, allLocation, error } = useSelector(state => state.allLocation);
    const [applicationIdInput, setApplicationInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [subjectInput, setSubjectInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const navigate = useNavigate();

    // Reset input details when Redux state becomes empty
    useEffect(() => {
        if (!detail) {
            setApplicationInput('');
            setDateInput('');
            setSubjectInput('');
            setLocationInput('');
        } else {
            setApplicationInput(detail.ApplicationID || '');
            setDateInput(detail.Date || '');
            setSubjectInput(detail.Subject || '');
        }
    }, [detail]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            return () => { dispatch(clearError()) }
        }
        dispatch(getAllLocation())
    }, [error]);

    const handlePrint = () => {
        print();
    };

    const handleApplicationIdChange = (e) => {
        setApplicationInput(e.target.value);
    };

    const handleDateChange = (e) => {
        setDateInput(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocationInput(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubjectInput(e.target.value);
    };

    const handleAddItem = () => {
        dispatch({ type: DEMAND_DETAIL, payload: { Subject: subjectInput, ApplicationID: applicationIdInput, Date: dateInput, locationId: locationInput } });
        navigate('/demandproduct');
    };

    // Function to check if all input fields are filled
    const allFieldsFilled = applicationIdInput.trim() !== '' && dateInput.trim() !== '' && subjectInput.trim() !== '' && locationInput.trim() !== '';

    return (
        <Fragment>
            {loading ? (
                <Loader />

            ) : (
                error ? (
                    <div></div>
                ) : (
                    <div>
                        <h1 className='heading'>Demand</h1>
                        <div className='body-Bar'>
                            <label className='label-bar'>Subject: </label>
                            <textarea type='text' className='Input-Bar' value={subjectInput} onChange={handleSubjectChange} placeholder='Enter subject'></textarea>
                            <label className='label-bar'>Application id: </label>
                            <input type='text' className='Input-Bar' value={applicationIdInput} onChange={handleApplicationIdChange} placeholder='Enter application id'></input>
                            <label className='label-bar'>Application date:</label>
                            <input type='date' className='Input-Bar' value={dateInput} onChange={handleDateChange}></input>
                            <label className='label-bar'>Location :</label>
                            <select className='Input-Bar' onChange={handleLocationChange}>
                                <option value="" disabled selected>Select location</option>
                                {allLocation?.map(location => (
                                    <option key={location._id} value={location._id}>{location.name}</option>
                                ))}
                            </select>

                        </div>
                        {/* Render button only if all fields are filled */}
                        {allFieldsFilled && <button className='button-addItem' onClick={handleAddItem}>Add Item</button>}
                    </div>
                )

            )}
        </Fragment>
    );
}

export default Bar;
