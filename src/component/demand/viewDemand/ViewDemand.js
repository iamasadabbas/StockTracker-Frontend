import React, { useEffect, useState, useRef, Fragment } from 'react';
import './ViewDemand.css';
import './ViewDemandModal.css'
import axiosInstance from '../../../axiosInstance/axiosInstance';
import TemplatePrint from '../printTemplate/TemplatePrint';
import { useNavigate } from 'react-router-dom';
import { CURRENT_DEMAND } from '../../../Redux/constants/demandConstants';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { useAlert } from 'react-alert';
import Loader from '../../Loader/Loader';
import ApproveModal from '../../Modal/DemandModal/ApproveModal';
import { clearError,getDemandById,getAllDemand } from '../../../actions/demandAction';

const URL = process.env.BASE_URL || 'http://localhost:4000';

function ViewDemandedReciept() {
    const alert = useAlert()
    const componentPDF = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, allDemand, error } = useSelector((state) => state.allDemand)
    console.log(allDemand);
    const [currentDemand, setCurrentDemand] = useState([]);
    const [currentDemandedProducts, setCurrentDemandedProducts] = useState([])
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
    const [_id, setId] = useState('');


    useEffect(() => {
        if (error) {
            alert.error(error);
            return () => { dispatch(clearError()) }
        }
        dispatch(getAllDemand())
    }, [error]);

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

    const printDemand = (_id) => {
        fetchDemand(_id); // Fetch the demand and let fetchDemand handle updating the state
    };

    const handlePrint = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Demand"
    });

    const handleApprove = (demand) => {
        // console.log(demand._id);
        dispatch(getDemandById(demand._id))
        const demandId = demand._id
        setId(demandId)
        setCurrentDemand(demand)
        const products = demand.products
        setCurrentDemandedProducts(products)
        setIsApproveModalOpen(true)
    }

    // useEffect(() => {
    //     if (_id !== '') {
    //         handlePrint();
    //     }
    // }, [_id]); 

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                error ? (null) : (
                    <>
                        <h1 className='heading-viewDemand'>View Demand</h1>
                    <div className='container-ViewDemand'>
                        <div ref={componentPDF} className='print-div' style={{ display: 'none' }}><TemplatePrint /></div>
                        <table className='table-ViewDemand'>
                            <thead>
                                <tr>
                                    <th>S:No</th>
                                    <th>ApplicationId</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                                {allDemand?.map((demand,index) => (
                                    <tr key={demand._id}>                                        
                                        <td>{index+1}</td>
                                        <td>{demand.applicationId}</td>
                                        <td>{demand.subject}</td>
                                        <td>{demand.date}</td>
                                        <td>{demand.status}</td>
                                        <td><button className='button-ViewDemand' onClick={() => { viewDemand(demand._id) }}>View</button></td>
                                        <td><button className='button-ViewDemand' onClick={() => { handleApprove(demand) }}>{demand.status=='Approved'?('details'):('Approve')}</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </>
                )
            )}
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
