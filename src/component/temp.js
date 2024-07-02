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
                                    {allDemand?.map((demand, index) => (
                                        <tr key={demand._id}>
                                            <td>{index + 1}</td>
                                            <td>{demand.applicationId}</td>
                                            <td>{demand.subject}</td>
                                            <td>{demand.date}</td>
                                            <td>{demand.status}</td>
                                            <td><button className='button-ViewDemand' onClick={() => { viewDemand(demand._id) }}>View</button></td>
                                            <td><button className='button-ViewDemand' onClick={() => { handleApprove(demand) }}>{demand.status == 'Approved' ? ('details') : ('Approve')}</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </>