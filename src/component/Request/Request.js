import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';
import './Request.css';
import { getAllRequest, clearError, getRequestById, getRequestedProduct } from '../../actions/requestAction';
import ViewRequestModal from '../Modal/RequestModel/ViewRequestModal';
import TablePagination from '@mui/material/TablePagination';
import { IoEyeSharp } from "react-icons/io5";


const Request = () => {
    const [event, setEvent] = useState('');
    const dispatch = useDispatch();
    const alert = useAlert();

    const { requests, loading, error } = useSelector((state) => state.requests);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getAllRequest());
    }, [dispatch, alert, error]);

    const [searchReqId, setSearchReqId] = useState('');
    const [searchUser, setSearchUser] = useState('');
    const [searchDateTime, setSearchDateTime] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredRequests = requests?.filter(request =>
        request.request_number.toLowerCase().includes(searchReqId.toLowerCase()) &&
        request.user_id.name.toLowerCase().includes(searchUser.toLowerCase()) &&
        new Date(request.createdAt).toLocaleString().toLowerCase().includes(searchDateTime.toLowerCase()) &&
        request.status.toLowerCase().includes(searchStatus.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const indexOfLastRequest = page * rowsPerPage + rowsPerPage;
    const indexOfFirstRequest = page * rowsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

    const [currentRequestId, setCurrentRequestId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleViewButtonClick = (request) => {
        const currentRequestId = request.request_id?._id;
        dispatch(getRequestById(request._id));
        setCurrentRequestId(currentRequestId);
        dispatch(getRequestedProduct(currentRequestId));
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="main-page-container">
                        <div className='pageName_And_Button'>
                            <h3>User Requests</h3>
                        </div>
                        <div className="search-bar">
                            <input 
                                type="text" 
                                placeholder="Enter Req.Id" 
                                value={searchReqId} 
                                onChange={(e) => setSearchReqId(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Enter User Name" 
                                value={searchUser} 
                                onChange={(e) => setSearchUser(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Enter Date/Time" 
                                value={searchDateTime} 
                                onChange={(e) => setSearchDateTime(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Enter Status" 
                                value={searchStatus} 
                                onChange={(e) => setSearchStatus(e.target.value)} 
                            />
                        </div>
                        <div className='table-container'>
                            <table className="customer-table">
                                <thead className='table-head'>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Request Id</th>
                                        <th>User</th>
                                        <th>Date.Time</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='tablebody_data'>
                                    {currentRequests?.map((request, index) => {
                                        const SNo = indexOfFirstRequest + index + 1;
                                        const reqId = request.request_number;
                                        const userName = request.user_id.name;
                                        const dateTime = request.createdAt;
                                        const requestStatus = request.status;
                                        const utcDateTime = new Date(dateTime);
                                        const localTimeString = utcDateTime.toLocaleTimeString();
                                        const localDateString = utcDateTime.toLocaleDateString();
                                        const formattedDateTime = `${localTimeString}, ${localDateString}`;

                                        return (
                                            <tr key={index}>
                                                <td>{SNo}</td>
                                                <td>{reqId}</td>
                                                <td>{userName}</td>
                                                <td>{formattedDateTime}</td>
                                                <td>{requestStatus}</td>
                                                <td>
                                                    <button className='action-btn' onClick={() => handleViewButtonClick(request)}><IoEyeSharp/></button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <TablePagination
                            component="div"
                            count={filteredRequests.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                    {isModalOpen && selectedRequest && (
                        <ViewRequestModal 
                            event={event}
                            request={selectedRequest}
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            currentRequestId={currentRequestId}
                        />
                    )}
                </>
            )}
        </Fragment>
    );
};

export default Request;
