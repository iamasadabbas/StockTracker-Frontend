import React, { useEffect, useRef } from 'react'
import Product from '../pages/Product'
import { useState } from 'react'
import axiosInstance from '../pages/axiosInstance'
import { useReactToPrint } from "react-to-print";
import '../styles/AllProduct.css'
import { BsDisplay } from 'react-icons/bs';

const URL = process.env.BASE_URL || 'http://localhost:4000';
function AllProductTable() {
    let user_id='660e6e5e7e276be3988e148e'
    const componentPDF = useRef();
    const [allProduct, setAllProduct] = useState([])
    const [addedProducts, setAddedProducts] = useState([])
    const [input, setInput] = useState('')
    const handleInputChange = (e, index) => {
        const updatedProducts = [...allProduct];
        updatedProducts[index] = { ...updatedProducts[index], quantity: e.target.value };
        setAllProduct(updatedProducts);
        // setInput(e.target.value);
    }
    const handlePrint = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Invoice",
    });
    const handleSave=async()=>{
        console.log(addedProducts);
        const data={
            products:[],user_id
        }
        addedProducts.forEach(element => {
            data.products.push({_id:element._id, quantity:element.quantity});
        });
        console.log("data",data);
        await axiosInstance.post(`${URL}/demand/demandProduct`,data)
    }
    const handleAddButton = (product, index) => {
        const updatedAllProducts = allProduct.map(p => {
            const { quantity, ...rest } = p; // Destructure the quantity key
            return rest; // Return the product without the quantity key
        });
        setAllProduct(updatedAllProducts);

        // Add the product to the addedProducts array
        let ind = -1;
        addedProducts.forEach((e, i) => {
            if (e._id == product._id) {
                ind = i;
            }
        })

        if (ind>-1) {
            const updatedProducts = [...addedProducts];
            updatedProducts[ind].quantity = parseInt(updatedProducts[ind].quantity) + parseInt(product.quantity);
            setAddedProducts(updatedProducts);
        } else {
        setAddedProducts([...addedProducts, product]);
        }
    };


    useEffect(() => {
        axiosInstance.get(`${URL}/product/getAllProduct`).then((response => {
            const products = response.data.product;
            setAllProduct(products)
        }))
    }, [])
    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Specifications</th>
                        <th>Description</th>
                        <th>Add Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allProduct && allProduct?.map((product, index) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.specifications}</td>
                            <td>{product.description}</td>
                            <td><input className='input-ProductQuantity' value={product.quantity || ""} type='number' onChange={(e) => { handleInputChange(e, index) }}></input></td>
                            <td><button className='button-AddProduct' onClick={() => { handleAddButton(product, index) }}>Add</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div ref={componentPDF} style={{ width: '100%' }}>
                <table className='table'>
                            
                {addedProducts && addedProducts.length > 0 ? (
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Specifications</th>
                            <th>Description</th>
                            <th>Add Quantity</th>
                        </tr>
                    </thead>) : null}
                    <tbody>
                        {addedProducts && addedProducts?.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.specifications}</td>
                                <td>{product.description}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {addedProducts && addedProducts.length > 0 ? (<div style={{display: "flex", flexDirection: "row", justifyContent: "center", gap: "50px"}}>
                    <button className='button-submit-AllProduct' onClick={handleSave}>Save</button>
                    <button className='button-submit-AllProduct' onClick={handlePrint}>Print</button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default AllProductTable
