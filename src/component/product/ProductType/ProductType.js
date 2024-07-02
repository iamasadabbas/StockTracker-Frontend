import React, { useState, useEffect, Fragment } from 'react';
import { clearError, addProductType, clearMessage, getAllProductType } from '../../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import '../AddProduct/Products.css';
import { useAlert } from 'react-alert';
import TablePagination from '@mui/material/TablePagination';
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function ProductType() {
    const navigate=useNavigate()
        const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, message, allProductType, error } = useSelector((state) => state.product);

    const [productTypeInput, setProductTypeInput] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchDescription, setSearchDescription] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleProductTypeChange = (e) => {
        setProductTypeInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addProductType(productTypeInput));
    };

    useEffect(() => {
        if (message) {
            alert.success(message);
            dispatch(clearMessage());
        } else if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getAllProductType());
    }, [error, message, dispatch, alert]);

    const filteredProductTypes = allProductType.filter(type =>
        type.name.toLowerCase().includes(searchType.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleAddTypeclick =()=>{
        navigate('/addProductType')
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const indexOfLastType = page * rowsPerPage + rowsPerPage;
    const indexOfFirstType = page * rowsPerPage;
    const currentProductTypes = filteredProductTypes.slice(indexOfFirstType, indexOfLastType);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <div className="main-page-container">
                    <div className='pageName_And_Button'>
                        <h3>Product Type</h3>
                        <button className="button-yellow" onClick={handleAddTypeclick}>Add Type</button>
                    </div>
                    
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search Product Type"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Search Product Type"
                            value={searchDescription}
                            onChange={(e) => setSearchDescription(e.target.value)}
                        />
                    </div>
                    <div className='table-container'>
                        <table className="customer-table">
                            <thead>
                                <tr>
                                    <th>SrNo</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='tablebody_data'>
                                {currentProductTypes.map((type, index) => (
                                    <tr key={type.id}>
                                        <td>{indexOfFirstType + index + 1}</td>
                                        <td>{type.name}</td>
                                        <td>{type.description}</td>
                                        <td>
                                            <button className="action-btn"><AiFillDelete /></button>
                                            <button className="action-btn"><MdOutlineUpdate /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <TablePagination
                        component="div"
                        count={filteredProductTypes.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            )}
        </Fragment>
    );
}
