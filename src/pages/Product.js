import axios from 'axios';
import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

const URL = process.env.BASE_URL || 'http://localhost:3000';

export default function Product() {
  const [name, setName] = useState('');
  const [product_code, setProduct_code] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [allProductType, setAllProductType] = useState([]);
  const [allProductCompany, setAllProductCompany] = useState([]);
  const [selectedCompanyValue, setSelectedCompanyValue] = useState('');
  const [selectedTypeValue, setSelectedTypeValue] = useState('');
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  let config = {
    headers: { 'Content-Type': 'application/json' },
  };


  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleProduct_codeChange = (e) => {
    setProduct_code(e.target.value);
  };

  const handleSpecificationsChange = (e) => {
    setSpecifications(e.target.value);
  };
  const handleTypeDropdownChange = (e) => {
    setSelectedTypeValue(e.target.value);
  };

  const handleCompanyDropdownChange = (e) => {
    setSelectedCompanyValue(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const getIds = async () => {
    allProductType.forEach(element => {
      //    console.log(element._id); 
      if (element.name === selectedTypeValue) {
        // console.log(element._id);
        setSelectedTypeId(element._id);
      }
    });

    allProductCompany.forEach(element => {
      //    console.log(element._id); 
      if (element.name === selectedCompanyValue) {
        // console.log(element._id);
        setSelectedCompanyId(element._id)
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !product_code || !specifications || !description || !quantity) {
      setError('Please enter all fields');
      return;
    }

    try {
      const response = await axios.post(`${URL}/product/addProduct`, {
        name: name,
        product_code: product_code,
        specifications: specifications,
        type_id: selectedTypeId,
        company_id: selectedCompanyId,
        description: description,
        quantity: quantity,
      });

      // console.log(response);

      if (response.status === 200) {
        alert('Registration successful');
        setName('');
        setProduct_code('');
        setSpecifications('');
        setDescription('');
        setDescription('');
        setQuantity('');
      } else if (response.status === 409) {
        alert('Email already exists');
      } else if (response.status === 400) {
        alert('Use a valid email and strong password');
      } else {
        alert('Error while registration');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Email already exists');
      } else {
        console.error('Error during registration:', error);
        alert('Error while registration');
      }
    }
  }

  useEffect(() => {
    axiosInstance.get(`${URL}/product/getProductType`, config)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          setAllProductType(response.data.product);
          // console.log(response.data.result);
        } else {
          alert('error');
        }
      })
      .catch((error) => {
        console.error('Error fetching roles:', error);
        alert('Error fetching roles. Please try again later.');
      });
    axiosInstance.get(`${URL}/product/getProductCompany`, config)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          setAllProductCompany(response.data.product);
          // console.log(response.data.result);
        } else {
          alert('error');
        }
      })
      .catch((error) => {
        console.error('Error fetching roles:', error);
        alert('Error fetching roles. Please try again later.');
      });
  }, []);
  useEffect(() => {
    getIds()
  }, [selectedCompanyValue, selectedTypeValue])

  return (
    <div className='body'>
      <div className="container">
        <h1 className='heading'>Add Product</h1>
        <form onSubmit={handleSubmit}>

          <input className='input' required value={name} onChange={handleNameChange} placeholder='Enter Your Name' />
          <input className='input' required value={product_code} type='text' onChange={handleProduct_codeChange} placeholder='Enter product_code' />
          <input className='input' required value={specifications} type='text' onChange={handleSpecificationsChange} placeholder='Enter specifications' />
          <select className='input' value={selectedTypeValue} onChange={handleTypeDropdownChange}>
            <option value="">Select Type</option>
            {allProductType.map((element) => (
              <option key={element._id} value={element.name}>
                {element.name}
              </option>
            ))}
          </select>
          <br />
          <select className='input' value={selectedCompanyValue} onChange={handleCompanyDropdownChange}>
            <option value="">Select Company</option>
            {allProductCompany.map((element) => (
              <option key={element._id} value={element.name}>
                {element.name}
              </option>
            ))}
          </select>


          {/* <input className='input' required value={type_id} type='text'  onChange={handleType_idChange} placeholder='Enter type_id' /> */}
          {/* <input className='input' required value={company_id} type='text' onChange={handleCompany_idChange} placeholder='Enter company_id' /> */}
          <input className='input' required value={description} type='text' onChange={handleDescriptionChange} placeholder='Enter description' />
          <input className='input' required value={quantity} type='number' onChange={handleQuantityChange} placeholder='Enter quantity' />
          <button className='button' type='submit'>Add Product</button>
        </form>
        {error && <div className="error-message">{typeof error === 'object' ? JSON.stringify(error) : error}</div>}
      </div>
    </div>
  );
}

