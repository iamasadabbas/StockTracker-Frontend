// src/AddVisaType.js
import React, { useState } from 'react';
import axios from 'axios';

const AddVisaType = () => {
    const [formData, setFormData] = useState({
        visaName: '',
        visaPrice: '',
        typeDescription: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleClear = () => {
        setFormData({
            visaName: '',
            visaPrice: '',
            typeDescription: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/visa', formData);
            handleClear();
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };

    return (
        <div className="main-page-container">
            <div className='pageName_And_Button'>
                <h2 className="add-visa-type-title">Add Visa Type</h2>
                <button className="button-yellow">Add Customer</button>
            </div>
            <form className="input-bar" onSubmit={handleSubmit}>
                <div className='input-with-label'>
                    <label className='required'>Name</label>
                    <input
                        type="text"
                        name="visaName"
                        placeholder="Enter Visa Name"
                        value={formData.visaName}
                        onChange={handleChange}
                        className="add-visa-type-input"
                        required
                    />
                </div>
                <div className='input-with-label'>

                    <label className='required'>Price</label>
                    <input
                        type="text"
                        name="visaPrice"
                        placeholder="Enter Visa Price"
                        value={formData.visaPrice}
                        onChange={handleChange}
                        className="add-visa-type-input"
                        required
                    />
                </div>
                <div className='input-with-label'>
                    <label className='required'>Description</label>
                    <input
                        type="text"
                        name="typeDescription"
                        placeholder="Enter Type Description"
                        value={formData.typeDescription}
                        onChange={handleChange}
                        className="add-visa-type-input"
                        required
                    />
                </div>

            </form>
            <div className="clear-and-Add-button-container">
                <button type="button" onClick={handleClear} className="clear-And-Add-Record-button">
                    Clear
                </button>
                <button type="submit" className="clear-And-Add-Record-button">
                    Add Record
                </button>
            </div>
        </div>
    );
};

export default AddVisaType;
