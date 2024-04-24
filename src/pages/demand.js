import React, { useEffect } from 'react'
import axiosInstance from './axiosInstance'
import { useState } from 'react'
import AllProductTable from '../components/AllProductTable'
import SelectedProduct from '../components/demand/SelectedProduct'
import Bar from '../components/demand/Bar'
const URL = process.env.BASE_URL || 'http://localhost:4000' ;

function Demand() {
    

  return (
    <div>
      <h1 className='heading'>Demand</h1>
      <Bar/>
      <SelectedProduct/>
      
    </div>
  )
}

export default Demand
