import React, { useEffect, useState, useRef, Fragment } from 'react';
import './ViewDemand.css';
import './ViewDemandModal.css';
import axiosInstance from '../../../axiosInstance/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { CURRENT_DEMAND } from '../../../Redux/constants/demandConstants';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../../Loader/Loader';
import ApproveModal from '../../Modal/DemandModal/ApproveModal';
import { clearError, getDemandById, getAllDemand } from '../../../actions/demandAction';
import TablePagination from '@mui/material/TablePagination';
import { IoEye } from "react-icons/io5";
import { AiFillInteraction } from "react-icons/ai";
import ReactTable from '../../ReactTable'; // Ensure the path is correct
import Tippy from '@tippyjs/react';

const URL = process.env.BASE_URL || 'http://localhost:4000';

function ViewDemandedReciept() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, allDemand, error } = useSelector((state) => state.allDemand);
    const [currentDemand, setCurrentDemand] = useState([]);
    const [currentDemandedProducts, setCurrentDemandedProducts] = useState([]);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [_id, setId] = useState('');
    const [searchApplicationId, setSearchApplicationId] = useState('');
    const [searchSubject, setSearchSubject] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getAllDemand());
    }, [dispatch, error, alert]);

    const fetchDemand = (_id) => {
        axiosInstance.get(`${URL}/demand/getDemandById/${_id}`).then((response) => {
            dispatch({ type: CURRENT_DEMAND, payload: { currentDemand: [response.data.demandedProduct] } });
            setId(_id); // Move the setId inside the callback to ensure it's called after dispatch
        });
    };

    const viewDemand = (_id) => {
        fetchDemand(_id);
        navigate('/templatePrint');
    };

    const handleApprove = (demand) => {
        dispatch(getDemandById(demand._id));
        setId(demand._id);
        setCurrentDemand(demand);
        const products = demand.products;
        setCurrentDemandedProducts(products);
        setIsApproveModalOpen(true);
    };

    const filteredDemands = allDemand?.filter(demand =>
        demand.applicationId.toLowerCase().includes(searchApplicationId.toLowerCase()) &&
        demand.subject.toLowerCase().includes(searchSubject.toLowerCase()) &&
        demand.date.toLowerCase().includes(searchDate.toLowerCase()) &&
        (searchStatus === '' || demand.status.toLowerCase() === searchStatus.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddDemandClick = () => {
        navigate('/demand');
    };

    const indexOfLastDemand = page * rowsPerPage + rowsPerPage;
    const indexOfFirstDemand = page * rowsPerPage;
    const currentDemands = filteredDemands?.slice(indexOfFirstDemand, indexOfLastDemand);

    const columns = [
        {
            Header: 'SrNo',
            accessor: (row, index) => indexOfFirstDemand + index + 1,
        },
        {
            Header: 'ApplicationId',
            accessor: 'applicationId',
        },
        {
            Header: 'Subject',
            accessor: 'subject',
        },
        {
            Header: 'Date',
            accessor: 'date',
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <div>
                    <Tippy content='View'>
                        <button className='action-btn' onClick={() => viewDemand(row.original._id)}>
                            <IoEye />
                        </button>
                    </Tippy>
                    <Tippy content='Action'>
                        <button className='action-btn' onClick={() => handleApprove(row.original)}>
                            <AiFillInteraction />
                        </button>
                    </Tippy>
                </div>
            ),
        },
    ];

    return (
        <Fragment>
            <div className="main-page-container">
                <div className='pageName_And_Button'>
                    <h2>View Demand</h2>
                    <button className="button-yellow" onClick={handleAddDemandClick}>Add Demand</button>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Enter Application ID"
                        value={searchApplicationId}
                        onChange={(e) => setSearchApplicationId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Subject"
                        value={searchSubject}
                        onChange={(e) => setSearchSubject(e.target.value)}
                    />
                    <select
                        value={searchStatus}
                        onChange={(e) => setSearchStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                    </select>
                </div>
                <div className='table-container'>
                    {loading ? (
                        <Loader />
                    ) : (
                        <ReactTable data={currentDemands} columns={columns} />
                    )}
                </div>
                <TablePagination
                    component="div"
                    count={filteredDemands?.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            )

            <div>
                {isApproveModalOpen && <ApproveModal
                    isApproveModalOpen={isApproveModalOpen}
                    setIsApproveModalOpen={setIsApproveModalOpen}
                    currentDemand={currentDemand}
                    currentDemandedProducts={currentDemandedProducts}
                    request_id={_id}
                />}
            </div>
        </Fragment>
    );
}

export default ViewDemandedReciept;
