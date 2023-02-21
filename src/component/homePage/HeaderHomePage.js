import React from 'react'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
function HeaderHomePage() {
 return (
  <div className='header_container_comonent'>
   <div className='logo_header_homePage'>
    <img src='https://stylemixthemes.com/masterstudy/wp-content/themes/landing/assets/svg/logo.svg' alt='image' />
   </div>
   <div className='content_header_homePage'>
    <ul>
     <li>Trang chủ</li>
     <li>Danh mục chương trình học</li>
     <li>Thông tin</li>
    </ul>
   </div>
   <Link to="/signin">
    <div className='add_lesson_btn' style={{ background: "#385cce", borderRadius: "7px" }} >
     <Button variant="contained" >{"+" + " " + "Đăng nhập"}</Button>
    </div>
   </Link>
  </div>
 )
}

export default HeaderHomePage