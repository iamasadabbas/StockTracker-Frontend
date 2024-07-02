import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getAllSignatureRecord, updateSignatureRecordStatus } from "../../../actions/signatureRecordAction";
import Loader from '../../Loader/Loader';
import Switch from 'react-switch';
import './ViewSignatureRecord.css';
import { useAlert } from "react-alert";
import TablePagination from '@mui/material/TablePagination'
import { useNavigate } from "react-router-dom";

export const ViewSignatureRecord = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { allSignatureRecord, loading, error } = useSelector((state) => state.signatureRecord);

  const [searchName, setSearchName] = useState('');
  const [searchDesignation, setSearchDesignation] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getAllSignatureRecord());
  }, [dispatch, error, alert]);

  const toggleStatus = (id, currentStatus) => {
    const status = !currentStatus;
    dispatch(updateSignatureRecordStatus(id, status));
  };

  const filteredRecords = allSignatureRecord.filter(record =>
    record.name.toLowerCase().includes(searchName.toLowerCase()) &&
    record.designation.toLowerCase().includes(searchDesignation.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddSignatureClick=()=>{
    navigate('/addsignaturerecord')
  }

  const indexOfLastRecord = page * rowsPerPage + rowsPerPage;
  const indexOfFirstRecord = page * rowsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="main-page-container">
          <div className="pageName_And_Button">
            <h2 className="add-visa-type-title">Signature Record</h2>
            <button className="button-yellow" onClick={handleAddSignatureClick}>Add Signature</button>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by Designation"
              value={searchDesignation}
              onChange={(e) => setSearchDesignation(e.target.value)}
            />
          </div>
          <div className="table-container">
            <table className="customer-table">
              <thead className="vsr-thead">
                <tr className="vsr-tr">
                  <th >S:No</th>
                  <th >Name</th>
                  <th >Designation</th>
                  <th >Status</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record, index) => (
                  <tr  key={record._id}>
                    <td >{indexOfFirstRecord + index + 1}</td>
                    <td >{record.name}</td>
                    <td >{record.designation}</td>
                    <td >
                      <Switch
                        onChange={() => toggleStatus(record._id, record.status)}
                        checked={record.status}
                        onColor="#007bff"
                        offColor="#ff7b7b"
                        border='none'
                        uncheckedIcon={false}
                        checkedIcon={false}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            component="div"
            count={filteredRecords.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </Fragment>
  );
};

export default ViewSignatureRecord;
