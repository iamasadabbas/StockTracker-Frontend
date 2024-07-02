import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddCompany } from '../../actions/companyAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import '../test.css'

const AddNewCompany = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const { message, error } = useSelector((state) => state.company);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      alert.success(message);
    } else if (error) {
      alert.error(error);
    }
  }, [message, error, alert]);

  const handleViewCompanyClick = () => {
    navigate('/company');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClear = () => {
    setFormData({
      name: '',
      description: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", formData.name);
    myForm.append("description", formData.description);

    try {
      await dispatch(AddCompany(myForm));
      handleClear();
      navigate('/company');
    } catch (err) {
      console.error('Error adding company:', err);
    }
  };

  return (
    <div className="main-page-container">
      <div className='pageName_And_Button'>
        <h2 className="add-visa-type-title">Add Company</h2>
        <button className="button-yellow" onClick={handleViewCompanyClick}>View Company</button>
      </div>
      <form className="input-bar" onSubmit={handleSubmit}>
        <div className='input-container'>
          <div className='input-with-label'>
            <label className='required'>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Company Name"
              value={formData.name}
              onChange={handleChange}
              className="add-visa-type-input"
              required
            />
          </div>
          <div className='input-with-label'>
            <label className='required'>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
              className="add-visa-type-input"
              required
            />
          </div>
        </div>
        <div className="clear-and-Add-button-container">
          <button type="button" onClick={handleClear} className="clear-And-Add-Record-button">
            Clear
          </button>
          <button type="submit" className="clear-And-Add-Record-button">
            Add Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCompany;
