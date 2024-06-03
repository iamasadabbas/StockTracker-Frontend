import React, { useState, useEffect, Fragment } from 'react';
import {  clearError,addProductType,clearMessage } from '../../../actions/productAction'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import '../AddProduct/AddProduct.css'
import { useAlert } from 'react-alert';

export default function ProductType() {
    const alert=useAlert()
    const dispatch = useDispatch();
    const {loading,message,error} =useSelector((state)=>state.product)
    // console.log(message);
    const [productTypeInput, setProductTypeInput] = useState('');

    const handleProductTypeChange = (e) => {
        setProductTypeInput(e.target.value);
    };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addProductType(productTypeInput))
    }
    useEffect(()=>{
        if(message){ 
            alert.success(message);
            dispatch(clearMessage())
        }else if(error){
            alert.error(error);
             dispatch(clearError())
        }
    },[error,message])
    return (
        <Fragment>
            {
                loading ?(
                    <Loader/>
                ):(
                    <div >
            <h1 className='heading'>Add Product Type Here</h1>
            <div className="login-container">

                <form onSubmit={handleSubmit}>
                    <label>Product Type</label>
                    <input className='Input' value={productTypeInput} onChange={handleProductTypeChange} placeholder='type product type here' />
                    <button className='login-button' type='submit'>Add</button>
                </form>
            </div>
        </div>
                )
            }
        </Fragment>
    )
}

