import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../Loader/Loader';
// import '../../Modal/Modal.css';
// import '../AllProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_DEMAND_DATA } from '../../../Redux/constants/demandConstants';
import { useNavigate } from 'react-router-dom';
import { getAllProduct, clearError } from '../../../actions/demandAction';
import { useAlert } from 'react-alert';
import TablePagination from '@mui/material/TablePagination';
import { IoBagAddOutline } from "react-icons/io5";

// import './test.css';

function AllProductTable() {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, allProduct, error } = useSelector((state) => state.product);
    const [currentProduct, setCurrentProduct] = useState({});
    const [inputQuantityChange, setInputQuantityChange] = useState('');
    const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleAddButton = (product) => {
        setCurrentProduct(product);
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
        dispatch(getAllProduct());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [error, alert, dispatch]);

    const searchData = useMemo(() => {
        return allProduct?.filter((product) => {
            return product.name.toLowerCase().includes(searchInput.toLowerCase());
        });
    }, [searchInput, allProduct]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const indexOfLastProduct = page * rowsPerPage + rowsPerPage;
    const indexOfFirstProduct = page * rowsPerPage;
    const currentProducts = searchData.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <div className='main-page-container'>
                    <div className='pageName_And_Button'>
                        <h3>All Products</h3>
                    </div>
                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="Search Product Name" 
                            value={searchInput} 
                            onChange={handleSearch} 
                        />
                    </div>
                    <div className='table-container'>
                        <table className="customer-table">
                            <thead>
                                <tr>
                                    <th>S:No</th>
                                    <th>Name</th>
                                    <th>Specifications</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='tablebody_data'>
                                {currentProducts.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{indexOfFirstProduct + index + 1}</td>
                                        <td>{product?.name}</td>
                                        <td>{product?.specifications}</td>
                                        <td>{product?.description}</td>
                                        <td>
                                            <button
                                                className='action-btn'
                                                onClick={() => handleAddButton(product)}
                                            >
                                                <IoBagAddOutline/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <TablePagination
                        component="div"
                        count={searchData.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Modal
                        className='Modal'
                        size='lg'
                        isOpen={isQuantityModalOpen}
                        toggle={() => setIsQuantityModalOpen(!isQuantityModalOpen)}
                    >
                        <ModalHeader >
                            <FontAwesomeIcon
                                className='svg-icon'
                                icon={faTimes}
                                style={{ float: 'right', cursor: 'pointer' }}
                                onClick={() => setIsQuantityModalOpen(false)}
                            />
                        </ModalHeader>
                        <ModalBody>
                            <table className='modal-body-table'>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr>
                                        <td>{currentProduct?.name}</td>
                                        <td>
                                            <input
                                                type='number'
                                                onChange={handleQuantityInputChange}
                                            >
                                            </input>
                                        </td>
                                        <td>
                                            <button className='submit_button' onClick={handleAddQuantityButton}>
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
