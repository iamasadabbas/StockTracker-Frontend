import React from 'react';
import './RequestBox.css'; // Import CSS file for component styling

const RequestBox = ({ request }) => {
    // console.log(request);
    return (
        <>
        
        <div className="request-table-container"> {/* Assign a unique class name */}
            <table className="request-table"> {/* Assign a unique class name */}
                <thead className="request-table-head"> {/* Assign a unique class name */}
                    <tr>
                        <th className="request-table-header">S:No</th> {/* Assign a unique class name */}
                        <th className="request-table-header">Name</th> {/* Assign a unique class name */}
                        <th className="request-table-header">Status</th> {/* Assign a unique class name */}
                    </tr>
                </thead>
                {/* {console.log(request)} */}
                <tbody className="request-table-body"> {/* Assign a unique class name */}
                    {
                       
                        request?.map(item => (
                            
                            <tr key={item._id} className="request-table-row"> {/* Assign a unique class name */}
                                <td className="request-table-cell">{item.request_number}</td> {/* Assign a unique class name */}
                                
                                <td className="request-table-cell">{item.user_id.name}</td> {/* Assign a unique class name */}
                                <td className="request-table-cell">{item.status}</td> {/* Assign a unique class name */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        </>
    );
}

export default RequestBox;
