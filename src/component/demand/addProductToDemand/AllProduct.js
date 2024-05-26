import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../Loader/Loader';
import '../../Modal/Modal.css';
import '../AllProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_DEMAND_DATA } from '../../Redux/constants/demandConstants';
import { useNavigate } from 'react-router-dom';
import { getAllProduct, clearError } from '../../actions/demandAction';
import { useAlert } from 'react-alert';

function AllProductTable() {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const locationId = '660ed51b8cc6708776801a2c';

    const { loading, allProduct, error } = useSelector((state) => state.allProduct);
    const [currentProduct, setCurrentProduct] = useState({});
    const [inputQuantityChange, setInputQuantityChange] = useState('');
    const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleAddButton = (product) => {
        setCurrentProduct(product.product_id); // Ensure product_id is passed correctly
        setIsQuantityModalOpen(true);
    };

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const handleQuantityInputChange = (e) => {
        setInputQuantityChange(e.target.value);
    };

    const handleAddQuantityButton = () => {
        if (inputQuantityChange === '') {
            return alert.error('Add Input first');
        }
        let updatedProduct = { ...currentProduct, quantity: inputQuantityChange };
        dispatch({ type: ADD_DEMAND_DATA, payload: updatedProduct });
        setIsQuantityModalOpen(false);
        navigate('/demand');
    };

    useEffect(() => {
        dispatch(getAllProduct(locationId));
    }, [dispatch, locationId]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [error, alert, dispatch]);

    const searchData = useMemo(() => {
        return allProduct?.filter((product) => {
            return product.product_id.name.toLowerCase().includes(searchInput.toLowerCase());
        });
    }, [searchInput, allProduct]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
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
                            {searchInput === ''
                                ? allProduct.map((product) => {
                                      const { _id, name, specifications, description } = product.product_id;
                                      return (
                                          <tr key={_id}>
                                              <td>{name}</td>
                                              <td>{specifications}</td>
                                              <td>{description}</td>
                                              <td>{product.quantity}</td>
                                              <td>
                                                  <button
                                                      className='button-AddProduct'
                                                      onClick={() => handleAddButton(product)}
                                                  >
                                                      Add
                                                  </button>
                                              </td>
                                          </tr>
                                      );
                                  })
                                : searchData.map((product) => {
                                      const { _id, name, specifications, description } = product.product_id;
                                      return (
                                          <tr key={_id}>
                                              <td>{name}</td>
                                              <td>{specifications}</td>
                                              <td>{description}</td>
                                              <td>{product.quantity}</td>
                                              <td>
                                                  <button
                                                      className='button-AddProduct'
                                                      onClick={() => handleAddButton(product)}
                                                  >
                                                      Add
                                                  </button>
                                              </td>
                                          </tr>
                                      );
                                  })}
                        </tbody>
                    </table>
                    <Modal
                        className='Modal'
                        size='lg'
                        isOpen={isQuantityModalOpen}
                        toggle={() => setIsQuantityModalOpen(!isQuantityModalOpen)}
                    >
                        <ModalHeader toggle={() => setIsQuantityModalOpen(!isQuantityModalOpen)}>
                            <FontAwesomeIcon
                                className='svg-icon'
                                icon={faTimes}
                                style={{ float: 'right', cursor: 'pointer' }}
                                onClick={() => setIsQuantityModalOpen(false)}
                            />
                        </ModalHeader>
                        <ModalBody>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{currentProduct.name}</td>
                                        <td>
                                            <input
                                             type='number' 
                                             onChange={handleQuantityInputChange}
                                             >
                                             </input>
                                        </td>
                                        <td>
                                            <button className='Add-button-Quantity' onClick={handleAddQuantityButton}>
                                                Add
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </ModalBody>
                    </Modal>
                </div>
            )}
        </Fragment>
    );
}

export default AllProductTable;
