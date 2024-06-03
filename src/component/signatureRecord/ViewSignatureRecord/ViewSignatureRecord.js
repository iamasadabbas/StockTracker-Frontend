import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getAllSignatureRecord,updateSignatureRecordStatus } from "../../../actions/signatureRecordAction";
import Loader from '../../Loader/Loader';
import Switch from 'react-switch';
import './ViewSignatureRecord.css'; // import the CSS file
import { useAlert } from "react-alert";

export const ViewSignatureRecord = () => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const { allSignatureRecord, loading, error } = useSelector((state) => state.signatureRecord);

  useEffect(() => {
    if (error) {
      alert.error(error);
      return () => dispatch(clearError())
    }
    dispatch(getAllSignatureRecord());
  }, [dispatch, error]);

  const toggleStatus = (id, currentStatus) => {
    const status = !currentStatus
    dispatch(updateSignatureRecordStatus(id, status))
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (error ? (null) : (
        <>
          <h2 className="page-heading">Signature Record</h2>
        <div className="vsr-table-container">
          {/* {error && <p className="vsr-error-message">Error: {error}</p>} */}
          <table className="vsr-table">
            <thead className="vsr-thead">
              <tr className="vsr-tr">
                <th className="vsr-th">S:No</th>
                <th className="vsr-th">Name</th>
                <th className="vsr-th">Designation</th>
                <th className="vsr-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {allSignatureRecord.map((record, index) => (
                <tr className="vsr-tr" key={record.id}>
                  <td className="vsr-td">{index + 1}</td>
                  <td className="vsr-td">{record.name}</td>
                  <td className="vsr-td">{record.designation}</td>
                  <td className="vsr-status-toggle">
                    <Switch
                      onChange={() => toggleStatus(record._id, record.status)}
                      checked={record.status}
                      onColor="#007bff" // Color when the switch is on
                      offColor="#ff7b7b" // Color when the switch is off
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )
      )}
    </Fragment>
  );
};
