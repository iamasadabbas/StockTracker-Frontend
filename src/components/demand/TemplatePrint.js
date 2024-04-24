import React from 'react'
import { useSelector } from 'react-redux'
import '../../styles/TemplatePrint.css'
import {useRef} from 'react'
import SelectedProduct from './SelectedProduct'

function TemplatePrint() {
    const { data, detail } = useSelector(state => state.demandReducer)
    // console.log(data);
    return (
        <React.Fragment>
        <div>
            <div className='body-template'>
                <div className='heading-template'>
                    <h2>Pir Mehr Ali Shah Arid Agriculture University Rawalpindi</h2>
                    <h3>University institute of information Technology </h3>
                </div>
                <div className='date-template'>
                    <h3>PMAS-AAUR/UIIT/-{detail?.ApplicationID}</h3>
                    <h4>{detail?.Date}</h4>
                </div>
                <div className='subject-template'>
                    <h3>Subject:  --------------</h3><br/>
                    <p className='paragraph-template'>the following consumable items are required on urgent basis at UIIT.
                        Details are as given below</p>
                </div>
                <div className='table-template'>
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
                </div>
                <div className='assistantDirector-signature'>
                    <h2>Ghulam Mustafa</h2>
                    <h3>Assistant Director</h3>
                </div>
                <div className='director-signature'>
                    <h2>Director UIIT</h2>
                </div>
                <div className='duptyRegistrar-signature'>
                    <h2>Deputy Registrar(TR-II)</h2>
                </div>

            </div>
        </div>
        </React.Fragment>
    )
}

export default TemplatePrint
