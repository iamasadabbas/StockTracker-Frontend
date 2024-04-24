import React, { useEffect } from 'react'
import { useState } from 'react';
import '../../styles/Bar.css';
import axiosInstance from '../../pages/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_DEMAND_DATA, DEMAND_DETAIL } from '../../Redux/Constants/constants';
const URL = process.env.BASE_URL || 'http://localhost:4000';


function Bar({print}) {
    const dispatch=useDispatch()
    const {data,detail}=useSelector(state=>state.demandReducer)
    const [allLocation, setAllLocation] = useState([]);
    const [applicationIdInput, setApplicationInput] = useState(detail?.ApplicationID);
    const [dateInput, setDateInput] = useState(detail?.Date);
    const [locationInput, setLocationInput] = useState('');
    const navigate = useNavigate();
    const handlePrint=()=> {
            print()
    }
    const handleApplicationIdChange = (e) => {
        setApplicationInput(e.target.value);
    }
    const handleMakeDemand=()=>{
        dispatch({type:DEMAND_DETAIL,payload:{ApplicationID:applicationIdInput, Date:dateInput, locationId:locationInput}})
        navigate('/demandproduct')
    }
    const handleDateChange = (e) => {
        setDateInput(e.target.value);
    }
    const handleLocationChange = (e) => {
        setLocationInput(e.target.value);
    }
    useEffect(() => {
        axiosInstance.get(`${URL}/location/getAllLocation`).then((response) => {
            // console.log(response.data.allLocation[0].name);
            setAllLocation(response.data.allLocation)
        })
    }, [])

    return (
        <div >
            <div className='body-Bar'>
            <label className='label-bar'>Enter Application id: </label>
            <input type='text' className='Input-Bar' value={applicationIdInput} onChange={handleApplicationIdChange} placeholder='Enter application id'></input>
            <label className='label-bar'>Enter Application date:</label>
            <input type='date' className='Input-Bar' value={dateInput} onChange={handleDateChange} ></input>
            <label className='label-bar'>Select Location :</label>
            <select className='Input-Bar' onChange={handleLocationChange}>
                {allLocation.map(location => (
                    <option key={location.id} value={location.name}>{location.name}</option>
                ))}
            </select>
        </div>
                    <button className='button-selectProduct' onClick={handleMakeDemand}>Make Demand</button>
                    
        </div>
    )
}

export default Bar
