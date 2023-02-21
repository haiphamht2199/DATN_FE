/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { } from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './header.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Header() {
 const dispatch = useDispatch()
 const user = useSelector(state => state.user);
 const [anchorEl, setAnchorEl] = React.useState(null);
 const open = Boolean(anchorEl);
 const navigate = useNavigate();
 const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
 };
 const handleClose = () => {
  setAnchorEl(null);
 };
 const handlehandleLogout = () => {
  localStorage.removeItem('user_id');
  localStorage.removeItem('student');
  localStorage.removeItem('token');
  if (!localStorage.getItem('user_id') && !localStorage.getItem('student') && !localStorage.getItem('token')) {
   dispatch({
    type: 'DELETE_TOKEN'
   })
   setAnchorEl(null);
   return navigate("/");
  }
 }
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
       <PersonIcon className='person_search'
        onClick={handleClick}
       />
      </div>
      <Menu
       id="basic-menu"
       anchorEl={anchorEl}
       open={open}
       onClose={handleClose}
       MenuListProps={{
        'aria-labelledby': 'basic-button',
       }}
      >
       <MenuItem onClick={handleClose}>Profile</MenuItem>
       <MenuItem onClick={handleClose}>My account</MenuItem>
       <MenuItem onClick={handlehandleLogout}>Logout</MenuItem>
      </Menu>
     </div>
    </div>
   </div>
  </>
 )
}

export default Header