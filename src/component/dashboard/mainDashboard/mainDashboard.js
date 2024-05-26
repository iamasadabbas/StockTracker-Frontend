import React, { Fragment, useState, useEffect } from 'react';
import { clearError } from '../../actions/dashboardAction';
import CardView from '../cardsComponent/CardView';
import LineChart from '../chart/LineChart';
import './mainDashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import { getProductCount, getWaitingProductRequest, get7DaysRequest } from '../../actions/dashboardAction';
import RequestBox from '../requestBox/RequestBox';
import { VscPackage } from "react-icons/vsc";
import { AiOutlineStock } from "react-icons/ai";
import { BsLayers } from "react-icons/bs";
import { RiGitPullRequestFill } from "react-icons/ri";
const Role = 'StoreKeeper'

const MainDashboard = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, productCount, request, lowStockProduct, requestCounts, outOfStockProduct, waitingRequestCount, error } = useSelector((state) => state.dashboard);
  const cardDetailsStoreKeeper = [
    {
      title: 'Total Prduction',
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
  ]
  const cardDetailsAdmin = [
    {
      title: 'Total User',
      icon: VscPackage,
      color: '#FFA500',
      count: productCount
    },
    {
      title: 'Active User',
      icon: AiOutlineStock,
      color: '#D715DD',
      count: lowStockProduct
    },
    {
      title: 'Total Role',
      icon: BsLayers,
      color: '#DC143C',
      count: outOfStockProduct
    },
    {
      title: 'User Approval',
      icon: RiGitPullRequestFill,
      color: '#191970',
      count: waitingRequestCount
    },
  ]
  useEffect(() => {
    // console.log('enter is loop');
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(get7DaysRequest());
    dispatch(getProductCount());
    dispatch(getWaitingProductRequest());
    }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className='dashboard-heading'>Dashboard</h1>
          <div className='cardView-dashboard'>
            {
              Role ==='StoreKeeper' ? (
                <CardView
              cardDetails={cardDetailsStoreKeeper}
            />
              ):(
                <CardView
              cardDetails={cardDetailsAdmin}
            />
              )
            }
            
            
          </div>
          <div className='chartPlusRequestBox'>
            <div className='LineChart'>
              <LineChart data={requestCounts} />
            </div>
            <div className='requestbox'>
              <RequestBox request={request} />
            </div>

          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MainDashboard;
