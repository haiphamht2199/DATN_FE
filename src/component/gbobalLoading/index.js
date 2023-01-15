import React from 'react'
import iconLoading from '../../assets/loading5.gif';
import './loading.css';
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
function GbobalLoading() {
 const isLoading = useSelector(state => state.showLoading.isloading);
 return (
  <>{
   isLoading && <div className='globalLoading'>
    <CircularProgress className='icon_loading' />
    {/* <img src={iconLoading} alt="loading" className='icon_loading' /> */}
   </div>
  }

  </>
 )
}

export default GbobalLoading