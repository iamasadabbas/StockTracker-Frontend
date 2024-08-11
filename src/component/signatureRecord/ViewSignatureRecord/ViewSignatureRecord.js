import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getAllSignatureRecord, updateSignatureRecordStatus } from "../../../actions/signatureRecordAction";
import Loader from '../../Loader/Loader';
import Switch from 'react-switch';
import './ViewSignatureRecord.css';
import { useAlert } from "react-alert";
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from "react-router-dom";
import ReactTable from '../../ReactTable'; // Adjust the path as needed

export const ViewSignatureRecord = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { allSignatureRecord, loading, error } = useSelector((state) => state.signatureRecord);
  // console.log(allSignatureRecord);

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

  const toggleStatus = async (id, currentStatus,allSignatureRecord) => {
    try {
      // Check if data is loaded before accessing it
      if (!allSignatureRecord.length) {
        console.warn("Signature records not yet loaded. Cannot update status.");
        return;
      }
  
      const updatedRecords = allSignatureRecord.map((record) => {
        if (record._id === id) {
          return { ...record, status: !currentStatus }; // Update only the target record
        } else if (record.status === true) {
          return { ...record, status: false }; // Deactivate others if activating this one
        } else {
          return record; // Keep other records unchanged
        }
      });
  
      // Dispatch the update action with the updated records
      console.log(updatedRecords);
      dispatch(updateSignatureRecordStatus(updatedRecords));
    } catch (error) {
      console.error("Error updating signature record status:", error);
      alert.error("Failed to update signature record status.");
    }
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

  const handleAddSignatureClick = () => {
    navigate('/addsignaturerecord');
  };

  const indexOfLastRecord = page * rowsPerPage + rowsPerPage;
  const indexOfFirstRecord = page * rowsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  // Define columns for ReactTable
  const columns = React.useMemo(
    () => [
      {
        Header: 'S:No',
        accessor: 'srNo',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Designation',
        accessor: 'designation',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => (
          <Switch
          onChange={() => toggleStatus(row.original._id, row.original.status,allSignatureRecord)}
          checked={row.original.status}
          onColor="#007bff"
          offColor="#ff7b7b"
            border='none'
            uncheckedIcon={false}
            checkedIcon={false}
            />
        ),
      },
    ],
    []
  );

  // Format data for ReactTable
  const tableData = React.useMemo(
    () =>
      currentRecords.map((record, index) => ({
        srNo: indexOfFirstRecord + index + 1,
        name: record.name,
        designation: record.designation,
        status: record.status,
        _id: record._id,
      })),
    [currentRecords, indexOfFirstRecord]
  );

  const { roleTask } = useSelector(
    (state) => state.userData
  );
  var task = false;
  task = roleTask.find((e) => e?.task_id?.name === "Add Signature Record" && e.status === true);


  return (
    <Fragment>
      <div className="main-page-container">
        <div className="pageName_And_Button">
          <h2 className="add-visa-type-title">Signature Record</h2>

          {task ? <button className="button-yellow" onClick={handleAddSignatureClick}>Add Signature</button>: null}
          
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
          {loading ? (
            <Loader />
          ) : (
            <ReactTable data={tableData} columns={columns} />
          )}
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
    </Fragment>
  );
};

export default ViewSignatureRecord;
