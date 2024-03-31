import React, { useState, useEffect } from 'react';
import '../styles/AddRole.css'
import axios from 'axios';

const URL = process.env.BASE_URL;
export default function ProductType() {
    const [productCompanyInput, setProductCompanyInput] = useState('');
    const [productCompanyDescriptionInput, setProductCompanyDescriptionInput] = useState('');

    const handleProductCompanyChange = (e) => {
        setProductCompanyInput(e.target.value);
    };
    const handleProductCompanyDescriptionChange = (e) => {
        setProductCompanyDescriptionInput(e.target.value);
    };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post(`${URL}/product/addProductCompany`, { name: productCompanyInput,description: productCompanyDescriptionInput});
        console.log(response);
        // console.log(response.data.status)
        if (response.data.status === 200) {
            alert('product added successfully')
            setProductCompanyInput('')
            setProductCompanyDescriptionInput('')
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
            <h1 className='heading'>Add Product Company</h1>
            <div className="login-container">

                <form onSubmit={handleSubmit}>
                    <label>Product Company</label>
                    <input className='Input' value={productCompanyInput} onChange={handleProductCompanyChange} placeholder='type product Comapny' />
                    <input className='Input' value={productCompanyDescriptionInput} onChange={handleProductCompanyDescriptionChange} placeholder='type product Company description' />
                    <button className='login-button' type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

