import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getAllProductType, addProduct } from '../../../actions/productAction';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import { getAllCompany } from '../../../actions/companyAction';

const AddProduct = () => {
    const navigate=useNavigate()
    const alert = useAlert();
    const { loading, allProductType, message, error } = useSelector((state) => state.product);
    const { allCompany } = useSelector((state) => state.company);
    const dispatch = useDispatch();

    // State variables for product details
    const [name, setName] = useState('');
    const [specifications, setSpecifications] = useState('');
    const [description, setDescription] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');

    const handleClear = () => {
        setName('');
        setSpecifications('');
        setDescription('');
        setSelectedType('');
        setSelectedCompany('');
    };
    const handleViewProductClick=()=>{
        navigate('/products')
    }


    useEffect(() => {
        dispatch(getAllProductType());
        dispatch(getAllCompany());
    }, [dispatch]);

    const handleAddProduct = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append('name', name);
        myForm.append('specifications', specifications);
        myForm.append('description', description);
        myForm.append('type_id', selectedType);
        myForm.append('company_id', selectedCompany);
        dispatch(addProduct(myForm));
        setName('');
        setSpecifications('');
        setDescription('');
        setSelectedType('');
        setSelectedCompany('');
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        } else if (message) {
            alert.success(message);
        }
    }, [error, dispatch, alert, message]);

    return (
        loading ? (
            <Loader />
        ) : (
            <div className="main-page-container">
                <div className='pageName_And_Button'>
                    <h3>Add Product</h3>
                    <button className='button-yellow' onClick={handleViewProductClick}> View Product</button>
                </div>
                <form className="input-bar" onSubmit={handleAddProduct} >
                <div className='input-container'>
                    <div className='input-with-label'>
                        <label className='required'>Name</label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='input-with-label'>
                    <label className='required'>Specifications</label>
                        <input
                            type="text"
                            placeholder="Enter specifications"
                            value={specifications}
                            onChange={(e) => setSpecifications(e.target.value)}
                        />
                    </div>
                    <div className='input-with-label'>
                    <label className='required'>Description</label>
                        <input
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='input-with-label'>
                    <label className='required'>Type</label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="">Select Type</option>
                            {allProductType?.map((type) => (
                                <option key={type.id} value={type._id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='input-with-label'>
                    <label className='required'>Company</label>
                        <select
                            className="search-input"
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                        >
                            <option value="">Select Company</option>
                            {allCompany?.map((company) => (
                                <option key={company.id} value={company._id}>{company.name}</option>
                            ))}
                        </select>
                    </div>
                    </div>
                    <div className="clear-and-Add-button-container">
                        <button type="submit" className="clear-And-Add-Record-button" onClick={handleClear}>Clear</button>
                        <button type="submit" className="clear-And-Add-Record-button" onClick={handleAddProduct}>Add Product</button>
                    </div>
                </form>
            </div>
        )
    );
};

export default AddProduct;
