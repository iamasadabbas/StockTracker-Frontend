import React, { useEffect, useRef } from 'react'
import { useReactToPrint } from "react-to-print";
import '../../styles/AllProduct.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TemplatePrint from './TemplatePrint.js';

const URL = process.env.BASE_URL || 'http://localhost:4000';
function SelectedProduct() {
    const navigate = useNavigate();
    const { data, detail } = useSelector(state => state.demandReducer)
    const componentPDF = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentPDF.current,
        // content: () => <TemplatePrint/>,
        documentTitle: "Invoice",
        // window.print()
    });
    // const handleTemplateButton=()=>{
    //     navigate('/templateprint')
    // }
    return (
        <div>
            <div ref={componentPDF} className='print-div' style={{display:'none'}}><TemplatePrint/></div>

            <div >
                <table className='table'>
                    {data && data.length > 0 ? (
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Specifications</th>
                                <th>Description</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>) : null}
                    <tbody>
                        {data && data?.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.specifications}</td>
                                <td>{product.description}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* {addedProducts && addedProducts.length > 0 ? (<div style={{display: "flex", flexDirection: "row", justifyContent: "center", gap: "50px"}}>
                    <button className='button-submit-AllProduct' onClick={handleSave}>Save</button>
                    <button className='button-submit-AllProduct' onClick={handlePrint}>Print</button>
                    </div>
                ) : null} */}
            </div>
            {data.length > 0 ? (
                <>
                    <button className='button-selectProduct' onClick={handlePrint}>Print</button>
                    {/* <button className='button-selectProduct' onClick={handleTemplateButton}>Template</button> */}
                </>
            ):null}
        </div>
    )
}

export default SelectedProduct
