import React, { Fragment, useEffect, useState } from 'react';
import './Bar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DEMAND_DETAIL } from '../../../Redux/constants/demandConstants';
import { getAllLocation, clearError } from '../../../actions/demandAction';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';

function Bar({ print }) {
    const alert = useAlert();
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
            setLocationInput(detail.locationId || '');
        }
    }, [detail]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            return () => dispatch(clearError());
        } else {

            dispatch(getAllLocation());
        }
    }, [error]);

    // const handlePrint = () => {
    //     print();
    // };

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
    const handleViewDemandClick=()=>{
        navigate('/viewdemand')
    }

    const handleAddItem = () => {
        dispatch({ type: DEMAND_DETAIL, payload: { Subject: subjectInput, ApplicationID: applicationIdInput, Date: dateInput, locationId: locationInput } });
        navigate('/demandproduct');
    };

    const allFieldsFilled = applicationIdInput.trim() !== '' && dateInput.trim() !== '' && subjectInput.trim() !== '' && locationInput.trim() !== '';

    return (
        <div >
            {loading ? (
                <div style={{width:'100%', height:'100vh'}}>
                    <Loader />
                </div>
            ) : error ? (
                <div>error</div>
            ) : (
                <div className="main-page-container" style={{paddingTop:'60px'}}>
                    <div className='pageName_And_Button'>
                        <h2 className="add-visa-type-title">Add Demand</h2>
                        <button className="button-yellow" onClick={handleViewDemandClick}>View Demand</button>
                    </div>
                    <div className='input-bar' style={{paddingTop:"20px"}}>
                        <div className='input-container'>
                        <div className='input-with-label'>
                        <label className='required'>Subject: </label>
                        <textarea type='text' required className='yellow_border' value={subjectInput} onChange={handleSubjectChange} placeholder='Enter subject'></textarea>
                        </div>
                        <div className='input-with-label'>
                        <label className='required'>Application id: </label>
                        <input type='text' required className='yellow_border' value={applicationIdInput} onChange={handleApplicationIdChange} placeholder='Enter application id'></input>
                        </div>
                        </div>
                    </div>
                    <div className='input-bar' style={{paddingTop:"20px"}}>
                        <div className='input-container'>
                        <div className='input-with-label'>
                        <label className='required'>Application date:</label>
                        <input type='date' required className='yellow_border' value={dateInput} onChange={handleDateChange}></input>
                        </div>
                        <div className='input-with-label'>
                        <label className='required'>Location :</label>
                        <select className='yellow_border' required value={locationInput} onChange={handleLocationChange}>
                            <option value="" disabled>Select location</option>
                            {allLocation?.map(location => (
                                <option key={location._id} value={location._id}>{location.name}</option>
                            ))}
                        </select>
                        </div>
                        </div>
                    </div>
                    <div className='clear-and-Add-button-container' style={{marginTop:'10px'}}>
                    {<button className='clear-And-Add-Record-button' disabled={!allFieldsFilled}onClick={handleAddItem}>Add Item</button>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bar;
