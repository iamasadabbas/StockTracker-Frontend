import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './TemplatePrint.css'

function TemplatePrint() {
    const { data, detail,AssistantDirector,currentDemand } = useSelector(state => state.demandReducer)
    if (currentDemand && currentDemand.currentDemand && currentDemand.currentDemand?.length > 0) {
        var demand=currentDemand?.currentDemand[0]
        var applicationId=demand?.applicationId;
        var subject=demand?.subject;
        var products=demand?.products;
        var date=demand?.date;
        var signatureRecord=demand?.signatureRecord_id
        // console.log(demand);
    }
    if(data?.length !==0 && detail?.length !==0){
        return (
            <React.Fragment>
            <div >
                <div className='body-template'>
                    <div className='heading-template'>
                        <h2>Pir Mehr Ali Shah Arid Agriculture University Rawalpindi</h2>
                        <h3>University institute of information Technology </h3>
                    </div>
                    <div className='date-template'>
                        <h3>PMAS-AAUR/UIIT/{detail?.ApplicationID}</h3>
                        <h4>{detail?.Date}</h4>
                    </div>
                    <div className='subject-template'>
                        <h3>Subject:  {detail?.Subject}</h3><br/>
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
                        <h2>{AssistantDirector[0].name}</h2>
                        <h3>{AssistantDirector[0].designation}</h3>
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
    }else{
        return (
            <React.Fragment>
            <div>
                <div className='body-template'>
                    <div className='heading-template'>
                        <h2>Pir Mehr Ali Shah Arid Agriculture University Rawalpindi</h2>
                        <h3>University institute of information Technology </h3>
                    </div>
                    <div className='date-template'>
                        <h3>PMAS-AAUR/UIIT/-{applicationId}</h3>
                        <h4>{date}</h4>
                    </div>
                    <div className='subject-template'>
                        <h3>Subject:  {subject}</h3><br/>
                        <p className='paragraph-template'>the following consumable items are required on urgent basis at UIIT.
                            Details are as given below</p>
                    </div>
                    <div className='table-template'>
                        <table className='table'>
                            {products && products.length > 0 ? (
                                <thead>
                                    <tr>
                                        <th>S:No</th>
                                        <th>Name</th>
                                        <th>Specifications</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>) : null}
                            <tbody>
                                {products && products?.map((product,index) => (
                                    <tr key={product._id}>
                                        <td>{index+1}</td>
                                        <td>{product._id.name}</td>
                                        <td>{product._id.specifications}</td>
                                        <td>{product._id.description}</td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='assistantDirector-signature'>
                        <h2>{signatureRecord?.name}</h2>
                        <h3>{signatureRecord?.designation}</h3>
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
}

export default TemplatePrint
