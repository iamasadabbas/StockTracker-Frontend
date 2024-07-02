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
  get7DaysUserApproval,
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

const MainDashboard = () => {
  // console.log('entered');
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
    if (isAuthenticated && user && user?.role_id && user?.role_id?.name) {
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
    } else if (role === 'Admin' || role === 'SuperAdmin') {
      dispatch(getTotalUserCount());
      dispatch(getTotalActiveUserCount());
      dispatch(getTotalRoleCount());
      dispatch(getUserApproval());
      dispatch(get7DaysUserApproval());
    }
  }, [dispatch, role]);

  useEffect(() => {
    if(error){
      alert.error(error);
      return ()=> dispatch(clearError())
    }
  }, [error]);

  const isDataLoadedForStoreKeeper = () => (
    waitingRequestCount !== undefined && productCount !== undefined && request !== undefined && lowStockProduct !== undefined && requestCounts !== undefined && outOfStockProduct !== undefined
  );
// console.log(totalUser);
// console.log(totalActiveUser);
// console.log(totalRole);
// console.log(totalUserApproval);
// console.log(approvalCounts);
const isDataLoadedForAdmin = () => {
  console.log('totalUser:', totalUser);
  console.log('totalActiveUser:', totalActiveUser);
  console.log('totalRole:', totalRole);
  console.log('totalUserApproval:', totalUserApproval);
  console.log('userApproval:', userApproval);
  console.log('approvalCounts:', approvalCounts);

  return (
    totalUser !== undefined &&
    totalActiveUser !== undefined &&
    totalRole !== undefined &&
    totalUserApproval !== undefined &&
    approvalCounts !== undefined
  );
};
  console.log(isDataLoadedForAdmin);

  return (
    <Fragment>
      {loading &&
       loading1
        ? (
        <Loader />
      ) : (
        error ? <div>{error}</div> : (
          <div>
            {/* {console.log('enter')} */}
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
            {/* {console.log(isDataLoadedForAdmin)} */}
            {(role === "Admin" || role === "SuperAdmin")  && isDataLoadedForAdmin() && (
              <div>
                {/* {
                  console.log('enter')
                } */}
                <h1 className='dashboard-heading'>Dashboard</h1>
                <div className='cardView-dashboard'>
                  <CardView cardDetails={cardDetailsAdmin} />
                </div>
                <div className='chartPlusRequestBox'>
                  <div className='LineChart'>
                    <LineChart data={approvalCounts} label={'User Approval'} />
                  </div >
                  <div className='user_request_container'>
                    <h2>Approval Requests</h2>
                  <div className='requestbox'>
                    <RegistrationApproval show={'requestBox'} />
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
