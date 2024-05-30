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
  get7DaysUserApproval
} from '../../actions/dashboardAction';
import './mainDashboard.css';
import { VscPackage } from "react-icons/vsc";
import { AiOutlineStock } from "react-icons/ai";
import { BsLayers } from "react-icons/bs";
import { RiGitPullRequestFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { PiOfficeChairFill } from "react-icons/pi";
import { IoTimeSharp } from "react-icons/io5";

const MainDashboard = () => {
  // const role='Admin'
  const [role, setRole] = useState('');
  const { loading1, isAuthenticated, user } = useSelector((state) => state.userData);
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
    userApproval,
    approvalCounts,
    error
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (user && user?.role_id && user?.role_id?.name) {
      setRole(user.role_id.name);
    }
  }, [user]);

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
    if (role === 'StoreKeeper') {
      dispatch(get7DaysRequest());
      dispatch(getProductCount());
      dispatch(getWaitingProductRequest());
    } else if (role === 'Admin') {
      dispatch(getTotalUserCount());
      dispatch(getTotalActiveUserCount());
      dispatch(getTotalRoleCount());
      dispatch(getUserApproval());
      dispatch(get7DaysUserApproval());
    }
  }, [dispatch, role]);

  useEffect(() => {
    console.log('Role:', role);
    console.log('Admin data:', {
      totalUser,
      totalActiveUser,
      totalRole,
      totalUserApproval,
      userApproval,
      approvalCounts,
    });
  }, [role, totalUser, totalActiveUser, totalRole, totalUserApproval, userApproval, approvalCounts]);

  const isDataLoadedForStoreKeeper = () => (
    waitingRequestCount !== undefined && productCount !== undefined && request !== undefined && lowStockProduct !== undefined && requestCounts !== undefined && outOfStockProduct !== undefined
  );

  const isDataLoadedForAdmin = () => (
     totalUser !== undefined && totalActiveUser !== undefined && totalRole !== undefined && totalUserApproval !== undefined && userApproval !== undefined && approvalCounts !== undefined
  );

  return (
    <Fragment>
      {loading &&
       loading1
        ? (
        <Loader />
      ) : (
        error ? <div>{error}</div> : (
          <div>
            {/* {console.log(isDataLoadedForStoreKeeper)} */}
            {role === "StoreKeeper" && isDataLoadedForStoreKeeper() && (
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
            {role === "Admin" && isDataLoadedForAdmin() && (
              <div>
                <h1 className='dashboard-heading'>Dashboard</h1>
                <div className='cardView-dashboard'>
                  <CardView cardDetails={cardDetailsAdmin} />
                </div>
                <div className='chartPlusRequestBox'>
                  <div className='LineChart'>
                    <LineChart data={approvalCounts} label={'User Approval'} />
                  </div>
                  <div className='requestbox'>
                    <RegistrationApproval show={'requestBox'} />
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
