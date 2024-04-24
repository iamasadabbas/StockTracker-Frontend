import React, { useEffect, useRef } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import axiosInstance from '../../pages/axiosInstance'
import '../../styles/AllProduct.css'
import { current } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_DEMAND_DATA } from '../../Redux/Constants/constants';
import { useNavigate } from 'react-router-dom';

const URL = process.env.BASE_URL || 'http://localhost:4000';
function AllProductTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const data=useSelector(state=> state.demandReducer)
    let locationId='660ed51b8cc6708776801a2c'
    const [allProduct, setAllProduct] = useState([])
    const [searchData, setSearchData] = useState([])
    const [currentProduct, setCurrentProduct] = useState([])
    const [inputQuantityChange, setInputQuantityChange] = useState([])
    const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false)
    const [updatedProductwithQuantity, setUpdatedProductwithQuantity] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const handleAddButton = (product) => {
        setCurrentProduct(product);
        setIsQuantityModalOpen(true)

    };
    // console.log(searchInput);
    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }
    const handleQuantityInputChange = (e) => {
        setInputQuantityChange(e.target.value)
    }
    const handleAddQuantityButton = () => {
        let updatedProduct = { ...currentProduct, quantity: inputQuantityChange };
        // setUpdatedProductwithQuantity(prevProducts => [...prevProducts, updatedProduct]);
       dispatch({type:ADD_DEMAND_DATA,payload:updatedProduct}) 
        setIsQuantityModalOpen(false)
        navigate('/demand')
        // console.log(data)
    }

    { updatedProductwithQuantity && console.log(updatedProductwithQuantity); }
    useEffect(() => {
        const filteredProducts = allProduct.filter((product) => {
            return product.product_id.name.toLowerCase().includes(searchInput.toLowerCase())
        })
        setSearchData(filteredProducts)
    }, [searchInput])


    useEffect(() => {
        axiosInstance.get(`${URL}/productLocation/getProductByLocationId/${locationId}`).then((response => {
            const products = response.data.request;
            console.log(products);
            setAllProduct(products)
        }))
    }, [])
    return (
        <div className='body-AllProduct'>
            <label className='label'>Search: </label>
            <input className='search-input' placeholder='Product Name' onChange={handleSearch}></input>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Specifications</th>
                        <th>Description</th>
                        <th>Available</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {searchInput === '' ? (
                        allProduct.map((product, index) => (
                            <tr key={product.product_id._id}>
                                <td>{product.product_id.name}</td>
                                <td>{product.product_id.specifications}</td>
                                <td>{product.product_id.description}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button className='button-AddProduct' onClick={() => { handleAddButton(product.product_id, index) }}>Add</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        searchData.map((product, index) => (
                            <tr key={product.product_id._id}>
                                <td>{product.product_id.name}</td>
                                <td>{product.product_id.specifications}</td>
                                <td>{product.product_id.description}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button className='button-AddProduct' onClick={() => { handleAddButton(product, index) }}>Add</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>

            </table>
            <Modal className='Quantity-modal'
            
                size='lg'
                isOpen={isQuantityModalOpen}
                toggle={() => setIsQuantityModalOpen(!isQuantityModalOpen)}
            >
                <ModalHeader toggle={() => setIsQuantityModalOpen(!isQuantityModalOpen)}>
                    <FontAwesomeIcon icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={() => setIsQuantityModalOpen(false)} />
                    <table className='table'>
                        {/* <thead>
                                <th>{currentProduct.name}</th>
                                <th>{currentProduct.specifications}</th>
                            </thead> */}
                    </table>
                </ModalHeader>
                <ModalBody>
                    <table className='table'>
                        <thead>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Action</th>

                        </thead>
                        <tbody>
                            <td>{currentProduct.name}</td>
                            <td><input onChange={handleQuantityInputChange}></input></td>
                            <td><button className='Add-button-Quantity' onClick={handleAddQuantityButton}>Add</button></td>
                        </tbody>
                    </table>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default AllProductTable
