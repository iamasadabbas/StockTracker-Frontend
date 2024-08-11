// src/AddVisaType.js
import React, { useEffect, useState } from 'react';
import { addProductType, clearError, clearMessage } from '../../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader'; // Assuming you have a Loader component or a library
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const AddProductType = () => {
    const navigate=useNavigate()
    const alert=useAlert()
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector((state) => state.product);

    const [formData, setFormData] = useState({
        productType: '',
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
            productType: '',
            typeDescription: '',
        });
    };
    const handleViewTypeClick =()=>{
        navigate('/producttype')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           await dispatch(addProductType(formData));
           handleClear();
           navigate('/producttype')
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };

    useEffect(() => {
        if (message) {
            alert.success(message);
            dispatch(clearMessage());
        }
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [message, error, dispatch]);


    const { roleTask } = useSelector(
        (state) => state.userData
      );
      var task = false;
      task = roleTask.find((e) => e?.task_id?.name === "View Product Type" && e.status === true);
      

    return (
        <div className="main-page-container">
            <div className='pageName_And_Button'>
                <h2 className="add-visa-type-title">Add Product Type</h2>
                {task ? <button className="button-yellow" onClick={handleViewTypeClick} disabled={loading}>View Types</button>: null}
                
            </div>
            {loading ? (
                <div className="loader-container">
                    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                </div>
            ) : (
                <form className="input-bar" onSubmit={handleSubmit}>
                    <div className='input-container'>
                        <div className='input-with-label'>
                            <label className='required'>Type</label>
                            <input
                                type="text"
                                name="productType"
                                placeholder="Enter product type"
                                value={formData.productType}
                                onChange={handleChange}
                                className="add-visa-type-input yellow_border"
                                required
                                disabled={loading}
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
                                className="add-visa-type-input yellow_border"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div className="clear-and-Add-button-container">
                        <button type="button" onClick={handleClear} className="clear-And-Add-Record-button" disabled={loading}>
                            Clear
                        </button>
                        <button type="submit" className="clear-And-Add-Record-button" disabled={loading}>
                            Add Record
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddProductType;
