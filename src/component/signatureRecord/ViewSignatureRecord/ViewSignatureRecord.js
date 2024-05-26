import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSignatureRecord } from "../../actions/signatureRecordAction";
import Loader from '../../Loader/Loader';
import Switch from 'react-switch';
import './ViewSignatureRecord.css'; // import the CSS file
import { updateSignatureRecordStatus } from "../../actions/signatureRecordAction";

export const ViewSignatureRecord = () => {
  const dispatch = useDispatch();
  const { allSignatureRecord, loading, error } = useSelector((state) => state.signatureRecord);

  useEffect(() => {
    dispatch(getAllSignatureRecord());
  }, [dispatch]);

  const toggleStatus = (id, currentStatus) => {
    const status=!currentStatus
    console.log(status);
    dispatch(updateSignatureRecordStatus(id,status))
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="vsr-table-container">
          {error && <p className="vsr-error-message">Error: {error}</p>}
          <table className="vsr-table">
            <thead className="vsr-thead">
              <tr className="vsr-tr">
                <th className="vsr-th">Name</th>
                <th className="vsr-th">Designation</th>
                <th className="vsr-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {allSignatureRecord.map((record) => (
                <tr className="vsr-tr" key={record.id}>
                  <td className="vsr-td">{record.name}</td>
                  <td className="vsr-td">{record.designation}</td>
                  {
                    console.log(record.status)
                  }
                  <td className="vsr-status-toggle">
                    <Switch 
                      onChange={() => toggleStatus(record._id, record.status)}
                      checked={record.status} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
};
