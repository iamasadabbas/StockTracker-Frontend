import React, { useState, useEffect } from 'react';
import '../styles/AddRole.css'
import axios from 'axios';

const URL = process.env.BASE_URL;
export default function ProductType() {
    const [productTypeInput, setProductTypeInput] = useState('');

    const handleProductTypeChange = (e) => {
        setProductTypeInput(e.target.value);
    };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post(`${URL}/product/addProductType`, { name: productTypeInput });
        console.log(response);
        // console.log(response.data.status)
        if (response.data.status === 200) {
            alert('product added successfully')
            setProductTypeInput('')
        }  if(response.data.status === 409){
            alert('product already exists');
        }
        } catch (error) {
          
            console.error('Error during registration:', error);
            alert('Error while registration');
          
        }
    }
    return (
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

