/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { } from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import './header.css';
import { useDispatch, useSelector } from "react-redux";
function Header() {
 const user = useSelector(state => state.user);
 return (
  <>
   <div className='header_teacher'>
    <div className='left-header'>
     <Link to="/home">
      <div className='logo_header' style={{ cursor: "pointer" }}>
       <img src='https://stylemixthemes.com/masterstudy/wp-content/themes/landing/assets/svg/logo.svg' alt='image' />
      </div>
     </Link>
    </div>
    <div className='right_header'>
     {
      user.student === "ADMIN" && <Link to="/tao-bai-giang" className="link">
       <div className='add_lesson_btn'>
        <Button variant="contained">{"+" + " " + "tạo bài giảng"}</Button>
       </div>
      </Link>
     }

     <div className='icon_header'>
      <div className='seacrh_header'>
       <SearchIcon className='icon_search' />
      </div>
      <div className='person_header'>
       <PersonIcon className='person_search' />
      </div>
     </div>
    </div>
   </div>
  </>
 )
}

export default Header