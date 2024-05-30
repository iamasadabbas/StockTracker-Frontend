import React, { useState, useEffect, Fragment } from 'react';
import { addProduct, clearError, clearMessage, getAllProductType } from '../../actions/productAction'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import './AddProduct.css'
import { useAlert } from 'react-alert';

export default function Product() {
    const alert=useAlert()
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [specifications, setSpecifications] = useState('');
    const [selectedTypeValue, setSelectedTypeValue] = useState('');
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [description, setDescription] = useState('');
    const { loading, allProductType,message, error } = useSelector((state) => state.product)
    // console.log(allProductType);


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSpecificationsChange = (e) => {
        setSpecifications(e.target.value);
    };
    const handleTypeDropdownChange = (e) => {
        setSelectedTypeValue(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const getIds = async () => {
        allProductType.forEach(element => {
            if (element.name === selectedTypeValue) {
                setSelectedTypeId(element._id);
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            dispatch(addProduct(name,specifications,selectedTypeId,description))
            setDescription('')
            setSpecifications('')
            setName('')
            setSelectedTypeValue('')
        }
            
    useEffect(() => {
        if(message){
         alert.success(message);
         dispatch(clearMessage())
         }else if(error){
             alert.error(error); 
           return ()=>  dispatch(clearError())
         }
    }, [error,message]);
    useEffect(() => {
        dispatch(getAllProductType())
    }, []);

    
    useEffect(() => {
        getIds()
    }, [selectedTypeValue])
    useEffect(()=>{
        
    },[])

    return (
        <Fragment>
            {
                loading ? (
                    <Loader />
                ) : ( error ? (null):(
                    <div className='body'>
                        <div className="container">
                            <h1 className='heading'>Add Product</h1>
                            <form onSubmit={handleSubmit}>

                                <input className='input' required value={name} onChange={handleNameChange} placeholder='Enter product name' />
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
                                <input className='input' required value={description} type='text' onChange={handleDescriptionChange} placeholder='Enter description' />
                                <button className='button' type='submit'>Add Product</button>
                            </form>
                            {error && <div className="error-message">{typeof error === 'object' ? JSON.stringify(error) : error}</div>}
                        </div>
                    </div>
                )
                )
            }
        </Fragment>
    );
}

