import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useReactToPrint } from "react-to-print";
import '../AllProduct.css'
import { useDispatch, useSelector } from 'react-redux';
import TemplatePrint from '../printTemplate/TemplatePrint.js';
import './AddedProduct.css'
import {  UPDATE_DATA, CLEAR_DETAILS, CLEAR_DEMAND_DATA } from '../../../Redux/constants/demandConstants.js';
import { MdOutlineDelete } from "react-icons/md";
import { clearError, saveDemand,getActiveAssistantDirectorSignatureRecord } from '../../../actions/demandAction.js'
import { useAlert } from 'react-alert';


function AddedProduct() {
    const dispatch = useDispatch();
    const alert=useAlert();
    const user_id = '65f9808effdbe72cf5b6fdcb'
    const { error, loading, data, detail,AssistantDirector } = useSelector(state => state.demandReducer)
    const componentPDF = useRef();
    const signatureRecord_id=AssistantDirector[0]?._id;
    // console.log(detail?.locationId);
    const handleDemandSave = () => {
        const demandData = {
            products: data,
            subject: detail?.Subject,
            applicationId: detail?.ApplicationID,
            date: detail?.Date,
            locationId: detail?.locationId,
            user_id: user_id,
            signatureRecord_id:signatureRecord_id
        };
        console.log('working');
        dispatch(saveDemand(demandData))
        clearData();
    };
    const clearData = () => {
        dispatch({ type: CLEAR_DEMAND_DATA })
        dispatch({ type: CLEAR_DETAILS })
    }

    const handlePrint = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Demand"
    });
    const handleDeleteProduct = (id) => {
        const updatedData = data.filter((item) => item?._id !== id)
        // console.log(updatedData);
        dispatch({ type: UPDATE_DATA, payload: updatedData });
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            return ()=>dispatch(clearError());
        }
        dispatch(getActiveAssistantDirectorSignatureRecord())
    }, [error])

    return (
                    <div className='addedProduct-container'>
                        <div
                            ref={componentPDF}
                            className='print-div'
                            style={{ display: 'none' }}
                        ><TemplatePrint /></div>
                        <div >
                            <table className='table'>
                                {data && data?.length > 0 ? (
                                    <thead>
                                        <tr>
                                            <th>S:No</th>
                                            <th>Name</th>
                                            <th>Specifications</th>
                                            <th>Description</th>
                                            <th>Quantity</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>) : null}
                                <tbody>
                                    {data && data?.map((product,index) => (
                                        <tr key={product?._id}>
                                            <td>{index+1}</td>
                                            <td>{product?.name}</td>
                                            <td>{product?.specifications}</td>
                                            <td>{product?.description}</td>
                                            <td>{product?.quantity}</td>
                                            <td><MdOutlineDelete style={{ fontSize: '24px' }} onClick={() => { handleDeleteProduct(product._id) }}></MdOutlineDelete></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {data?.length > 0 ? (
                            <>
                                <button className='button-genrateInvoice' onClick={() => { handlePrint(); handleDemandSave(); }}>Genrate Invoice</button>
                            </>
                        ) : null}
                    </div>
                )
            }

export default AddedProduct
