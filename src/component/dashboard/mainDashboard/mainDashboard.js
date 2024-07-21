import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import CardView from '../cardsComponent/CardView';
import LineChart from '../chart/LineChart';
import RequestBox from '../requestBox/RequestBox';
import RegistrationApproval from '../../registrationApproval/RegistrationApproval';
import {
  getTotalActiveUserCount,
  getTotalRoleCount,
  getTotalUserCount,
  getUserApproval,
  getProductCount,
  getWaitingProductRequest,
  get7DaysRequest,
  getUserApprovalCount,
  clearError
} from '../../../actions/dashboardAction';
import './mainDashboard.css';
import { VscPackage } from "react-icons/vsc";
import { AiOutlineStock } from "react-icons/ai";
import { BsLayers } from "react-icons/bs";
import { RiGitPullRequestFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { PiOfficeChairFill } from "react-icons/pi";
import { IoTimeSharp } from "react-icons/io5";
import { getAllRegistrationApproval } from '../../../actions/registrationApprovalAction';

const MainDashboard = () => {
  const [role, setRole] = useState('');
  const [timePeriod, setTimePeriod] = useState('week');
  const { loading1,isAuthenticated, user } = useSelector((state) => state.userData);
  const { allRegistration } = useSelector((state) => state.allRegistration);


  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading,
    productCount,
    request,
    lowStockProduct,
    requestCounts,
    outOfStockProduct,
    waitingRequestCount,
    totalUser,
    totalActiveUser,
    totalRole,
    totalUserApproval,
    approvalCounts,
    error
  } = useSelector((state) => state.dashboard);

  // useEffect(() => {
  //   if (isAuthenticated && user?.role_id?.name) {
  //     setRole(user.role_id.name);
  //   }
  // }, [user]);

  const handleChange = (e) => {
    setTimePeriod(e.target.value);
  };

  const cardDetailsStoreKeeper = useMemo(() => [
    {
      title: 'Total Product',
      icon: VscPackage,
      color: '#FFA500',
      count: productCount
    },
    {
      title: 'Low Stock',
      icon: AiOutlineStock,
      color: '#D715DD',
      count: lowStockProduct
    },
    {
      title: 'Out of Stock',
      icon: BsLayers,
      color: '#DC143C',
      count: outOfStockProduct
    },
    {
      title: 'Waiting Request',
      icon: RiGitPullRequestFill,
      color: '#191970',
      count: waitingRequestCount
    },
  ], [productCount, lowStockProduct, outOfStockProduct, waitingRequestCount]);

  const cardDetailsAdmin = useMemo(() => [
    {
      title: 'Total User',
      icon: FaUser,
      color: '#FFA500',
      count: totalUser
    },
    {
      title: 'Active User',
      icon: FaUserCheck,
      color: '#D715DD',
      count: totalActiveUser
    },
    {
      title: 'Total Role',
      icon: PiOfficeChairFill,
      color: '#DC143C',
      count: totalRole
    },
    {
      title: 'User Approval',
      icon: IoTimeSharp,
      color: '#191970',
      count: totalUserApproval
    },
  ], [totalUser, totalActiveUser, totalRole, totalUserApproval]);

  useEffect(() => {
    if (user?.role_id?.name === 'StoreKeeper') {
      dispatch(get7DaysRequest());
      dispatch(getProductCount());
      dispatch(getWaitingProductRequest());
    } else if (user?.role_id?.name === 'Admin' || user?.role_id?.name === 'SuperAdmin') {
      dispatch(getTotalUserCount());
      dispatch(getTotalActiveUserCount());
      dispatch(getTotalRoleCount());
      dispatch(getUserApproval());
      dispatch(getAllRegistrationApproval());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user?.role_id?.name === 'Admin' || user?.role_id?.name === 'SuperAdmin') {
      dispatch(getUserApprovalCount(timePeriod));
    }
  }, [dispatch, user, timePeriod]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, alert, dispatch]);

  const isDataLoadedForStoreKeeper = () => (
    waitingRequestCount !== undefined && productCount !== undefined && request !== undefined && lowStockProduct !== undefined && requestCounts !== undefined && outOfStockProduct !== undefined
  );

  const isDataLoadedForAdmin = () => (
    totalUser !== undefined &&
    totalActiveUser !== undefined &&
    totalRole !== undefined &&
    totalUserApproval !== undefined &&
    approvalCounts !== undefined
  );

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const currentDayIndex = today.getDay();
  const weekDays = Array.from({ length: 7 }, (_, i) => dayNames[(currentDayIndex - 6 + i + 7) % 7]);

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    return `${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
  }).reverse();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
    return `${monthNames[month.getMonth()]} ${month.getFullYear()}`;
  }).reverse();

  return (
    <Fragment>
      { loading1? (
        // <div style={{height:'100%',width:'100%'}}>
        <Loader />
        // </div>
      ) : (
        error ? (
          <div>{error}</div>
        ) : (
          <div>
            {user?.role_id?.name === "StoreKeeper" && isDataLoadedForStoreKeeper() && (
              <div>
                <h1 className='dashboard-heading'>Dashboard</h1>
                <div className='cardView-dashboard'>
                  <CardView cardDetails={cardDetailsStoreKeeper} />
                </div>
                <div className='chartPlusRequestBox'>
                  <div className='LineChart'>
                    <LineChart data={requestCounts} label={'Requests'} />
                  </div>
                  <div className='requestbox'>
                    <RequestBox request={request} />
                  </div>
                </div>
              </div>
            )}
            {(user?.role_id?.name === "Admin" || user?.role_id?.name === "SuperAdmin") && isDataLoadedForAdmin() && (
              <div>
                <h1 className='dashboard-heading'>Dashboard</h1>
                <div className='cardView-dashboard'>
                  <CardView cardDetails={cardDetailsAdmin} />
                </div>
                <div className='chartPlusRequestBox'>
                  <div className='LineChart'>
                    <div className='timeperiod-div'>
                      <label htmlFor="timePeriod">Select Time Period: </label>
                      <select id="timePeriod" value={timePeriod} onChange={handleChange}>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                    </div>
                    {
                      loading ? (<Loader />) : (
                        <>
                          {timePeriod === 'week' && <LineChart data={approvalCounts} label={'Weekly Data'} labels={weekDays} />}
                          {timePeriod === 'month' && <LineChart data={approvalCounts} label={'Monthly Data'} labels={last30Days} />}
                          {timePeriod === 'year' && <LineChart data={approvalCounts} label={'Yearly Data'} labels={last12Months} />}
                        </>
                      )
                    }

                  </div >
                  <div className='user_request_container'>
                    <h2>Approval Requests</h2>
                    <div className='approval-table-container'>
                      <table className='approval-table'>
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allRegistration.map((registration, index) => (
                            <tr key={registration._id}>
                              <td>{index + 1}</td>
                              <td>{registration.name}</td>
                              <td>{registration.role_id == null ? 'waiting' : ''}</td>
                            </tr>
                          ))}
                        </tbody>

                      </table>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </Fragment>
  );
};

export default MainDashboard;
