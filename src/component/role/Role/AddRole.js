import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRole,clearError,clearMessage } from '../../../actions/roleAction';
import { useAlert } from 'react-alert';


const AddRole = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [roleInput, setRoleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const { loading, message, error } = useSelector(state => state.role);

    const handleClear = () => {
        setRoleInput('');
        setDescriptionInput('');
    };

    const handleViewRoleClick = () => {
        navigate('/testrole');
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
           return()=> dispatch(clearError());
        }
        if (message) {
            alert.success(message);
            return()=> dispatch(clearMessage());
        }
    }, [error, message, dispatch, alert]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addRole(roleInput, descriptionInput));
            handleClear();
            navigate('/role')
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };

    const { roleTask } = useSelector(
        (state) => state.userData
      );
      
      
      var task = false;
      task = roleTask.find((e) => e?.task_id?.name === "View User Role" && e.status === true);
      
      


    return (
        <div className="main-page-container">
            <div className='pageName_And_Button'>
                <h2 className="add-visa-type-title">Add Role</h2>
                {task ? <button className="button-yellow" onClick={handleViewRoleClick}>View Role</button>: null}
                
            </div>
            <form className="input-bar" onSubmit={handleSubmit}>
            <div className='input-container'>
                    <div className='input-with-label'>
                        <label className='required'>Name</label>
                        <input
                            type="text"
                            className='yellow_border'
                            name="Name"
                            placeholder="Enter Role Name"
                            value={roleInput}
                            onChange={(e) => setRoleInput(e.target.value)}
                            required
                        />
                    </div>
                    <div className='input-with-label'>
                        <label className='required'>Description</label>
                        <input
                            type="text"
                            className='yellow_border'
                            name="Description"
                            placeholder="Enter Role Description"
                            value={descriptionInput}
                            onChange={(e) => setDescriptionInput(e.target.value)}
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

export default AddRole;
