import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from 'react-redux';
import TemplatePrint from '../printTemplate/TemplatePrint.js';
import { MdOutlineDelete } from "react-icons/md";
import { clearError, saveDemand, getActiveAssistantDirectorSignatureRecord } from '../../../actions/demandAction.js';
import { useAlert } from 'react-alert';
import TablePagination from '@mui/material/TablePagination';
import { CLEAR_DETAILS, CLEAR_DEMAND_DATA, UPDATE_DATA } from '../../../Redux/constants/demandConstants.js';
import ReactTable from '../../ReactTable'; // Ensure the path is correct
import { Height } from '@material-ui/icons';
import Tippy from '@tippyjs/react';

function AddedProduct() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const user_id = '65f9808effdbe72cf5b6fdcb';
    const { error, loading, data, detail, AssistantDirector } = useSelector(state => state.demandReducer);
    const componentPDF = useRef();
    const signatureRecord_id = AssistantDirector[0]?._id;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleDemandSave = () => {
        const demandData = {
            products: data,
            subject: detail?.Subject,
            applicationId: detail?.ApplicationID,
            date: detail?.Date,
            locationId: detail?.locationId,
            user_id: user_id,
            signatureRecord_id: signatureRecord_id
        };
        dispatch(saveDemand(demandData));
        clearData();
    };

    const clearData = () => {
        dispatch({ type: CLEAR_DEMAND_DATA });
        dispatch({ type: CLEAR_DETAILS });
    };

    const handlePrint = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Demand"
    });

    const handleDeleteProduct = (id) => {
        const updatedData = data.filter((item) => item?._id !== id);
        dispatch({ type: UPDATE_DATA, payload: updatedData });
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getActiveAssistantDirectorSignatureRecord());
    }, [error, dispatch, alert]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const indexOfLastProduct = page * rowsPerPage + rowsPerPage;
    const indexOfFirstProduct = page * rowsPerPage;
    const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

    const columns = [
        {
            Header: 'S:No',
            accessor: (row, index) => indexOfFirstProduct + index + 1,
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Specifications',
            accessor: 'specifications',
        },
        {
            Header: 'Description',
            accessor: 'description',
        },
        {
            Header: 'Quantity',
            accessor: 'quantity',
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <Tippy content='Delete'>
                <button className="action-btn" onClick={() => handleDeleteProduct(row.original._id)}>
                    <MdOutlineDelete />
                </button>
                </Tippy>
            ),
        },
    ];

    return (
        <div className='main-page-container' style={{ paddingTop: '0px' }}>
            <div ref={componentPDF} className='print-div' style={{ display: 'none' }}>
                <TemplatePrint />
            </div>
            {data && data.length > 0 ? (
                <>
                    <div className='pageName_And_Button'>
                        <h3>Added Products</h3>
                    </div>
                    <div className='table-container' style={{height:'250px'}}>
                        <ReactTable data={currentProducts}  columns={columns} />
                    </div>
                    <button className='button-genrateInvoice' onClick={() => { handlePrint(); handleDemandSave(); }}>Generate Invoice</button>
                    <TablePagination
                        component="div"
                        count={data.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            ) : (
                null
            )}
        </div>
    );
}

export default AddedProduct;
