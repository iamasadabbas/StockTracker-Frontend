import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import { addSignatureRecord, clearMessage, clearError } from '../../../actions/signatureRecordAction';
import { useNavigate } from 'react-router-dom';

export default function AddSignatureRecord() {
  const navigate = useNavigate()
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.signatureRecord);

  const [nameInput, setNameInput] = useState('');
  const [designationInput, setDesignationInput] = useState('');

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleDesignationChange = (e) => {
    setDesignationInput(e.target.value);
  };
  const handleViewSignatureClick =()=>{
    navigate('/viewSignatureRecord')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addSignatureRecord(nameInput, designationInput));
    setNameInput('');
    setDesignationInput('');
    navigate('/viewSignatureRecord')
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [error, message, alert, dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="main-page-container">
          <div className="pageName_And_Button">
            <h2 className="add-visa-type-title">Signature Record</h2>
            <button className="button-yellow" onClick={handleViewSignatureClick}>View Signature</button>
          </div >
          <form className="input-bar" onSubmit={handleSubmit}>
            <div className='input-container'>

           
            <div className="input-with-label">
              <label className="required">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Type name here"
                value={nameInput}
                onChange={handleNameChange}
                className="add-visa-type-input"
                required
              />
            </div>
            <div className="input-with-label">
              <label className="required">Designation</label>
              <input
                type="text"
                name="designation"
                placeholder="Type designation here"
                value={designationInput}
                onChange={handleDesignationChange}
                className="add-visa-type-input"
                required
              />
            </div>
            </div>
            <div className="clear-and-Add-button-container">
              <button type="button" onClick={() => { setNameInput(''); setDesignationInput(''); }} className="clear-And-Add-Record-button">
                Clear
              </button>
              <button type="submit" className="clear-And-Add-Record-button">
                Add Record
              </button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
}
