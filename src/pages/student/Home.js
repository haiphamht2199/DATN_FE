import React, { useState, useEffect, useCallback } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Typography, Box, Button } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
const Home = () => {
 const dispatch = useDispatch();
 const courses = useSelector(state => state.student.courses);
 useEffect(() => {
  dispatch({
   type: 'SHOW_LOADING_START'
  });
  setTimeout(() => {
   dispatch({
    type: 'GET_ALL_COURSE_STUDENT'
   })
  }, 500)
 }, [])
 return (
  <div className='detail_class'>
   <div className='url_lession_top'>
    <div >
     <AddToPhotosIcon className='icon_lession' />
    </div>
    <div className='url_lession_detail'>
     <div className='content_url'>Danh sách khóa học của tôi.</div>
    </div>
   </div>
   <div className='search_course'>

    <TextField
     name="nameNewLession"
     variant="outlined"
     fullWidth
     className='search_task_inut'
     placeholder='Nhập tên khóa học'
    />

    <div >
     <Button className='submit_search_task' variant="contained" startIcon={<SearchIcon />}>
      Tìm kiếm
     </Button>
    </div>
   </div>
   <div className='list_course_student_home'>
    <div className='title_list_course'>
     Khóa học của tôi
    </div>
    <div className='content_list_course'>

     {
      courses.length ? courses.map(course => (
       <div className='card_course'>

        <div className='image_course'>
         <Link to={`/bai-hoc/chi-tiet-lop-hoc?class_id=${course.class_id}&tag_class=` + course.tag_class}>
          <img src={require(`../../resource/${course.name_class}`)} alt='course' />
         </Link>
        </div>

        <div className='name_course'>
         {course.path_image_class}
        </div>
        <div className='number_student_course'>
         <div className='icon'>
          <GroupsIcon className='icon_numer_student' />
         </div>
         <div className='number_student'>
          {course.total_student_id}
         </div>
        </div>
       </div>
      )) : ""

     }


    </div>
   </div>
   <div className='list_course_student_home'>
    <div className='title_list_course'>
     Khóa học có thể đăng kí
    </div>
    <div className='content_list_course'>
     <div className='list_class_ago'>
      <div className='class_child_homePage_student'>
       <img src="https://i.ytimg.com/vi/jHBvqPEBhB8/hqdefault.jpg" alt="game" />
       <div className='name_class_homePage'>Trò chơi số và tương tác</div>
       <div className='hr_class'></div>
       <div className='bottom_class_child'>
        <div className='bottom_left_child'>
         <span>
          <AccessAlarmIcon style={{ color: "blue" }} />
         </span>
         <span style={{ fontWeight: "500" }}>15 giờ</span>
        </div>
        <div className='bottom_right_child'>
         <span>
          <StarBorderIcon style={{ color: "red" }} />
         </span>
         <span style={{ fontWeight: "500" }}>200</span>
        </div>
       </div>
      </div>
      <div className='class_child_homePage_student'>
       <img src="https://tse1.mm.bing.net/th?id=OIP.7GtcXn9xv5SQ2Zi31gP9AwHaE8&pid=Api&P=0" alt="game" />
       <div className='name_class_homePage'>Mô phỏng trong giáo dục</div>
       <div className='hr_class'></div>
       <div className='bottom_class_child'>
        <div className='bottom_left_child'>
         <span>
          <AccessAlarmIcon style={{ color: "blue" }} />
         </span>
         <span style={{ fontWeight: "500" }}>15 giờ</span>
        </div>
        <div className='bottom_right_child'>
         <span>
          <StarBorderIcon style={{ color: "red" }} />
         </span>
         <span style={{ fontWeight: "500" }}>200</span>
        </div>
       </div>
      </div>
      <div className='class_child_homePage_student'>
       <img src="https://tse2.mm.bing.net/th?id=OIP.paeT6FYR2pD2_mpafPlFlgHaEn&pid=Api&P=0" alt="game" />
       <div className='name_class_homePage'>Video số trong giáo dục</div>
       <div className='hr_class'></div>
       <div className='bottom_class_child'>
        <div className='bottom_left_child'>
         <span>
          <AccessAlarmIcon style={{ color: "blue" }} />
         </span>
         <span style={{ fontWeight: "500" }}>15 giờ</span>
        </div>
        <div className='bottom_right_child'>
         <span>
          <StarBorderIcon style={{ color: "red" }} />
         </span>
         <span style={{ fontWeight: "500" }}>200</span>
        </div>
       </div>
      </div>

     </div>
    </div>
   </div>
   <div className='list_course_student_home'>
    <div className='title_list_course'>
     Bài viết nổi bật
    </div>
    <div className='content_list_course'>
     <div className='list_class_ago write_homeage'>
      <div className='write_class_homePage_child'>
       <img src='https://networkpro.vn/wp-content/uploads/2021/05/can-bang-tai-5.png' />
       <div className='bottom_write_class'>
        <div className='bottom_left_write_class'>
         <div className='caculate_homePage'>
          <div className="month_homePage">Tháng 11</div>
          <div className="date_homePage">06</div>
         </div>
        </div>
        <div className='bottom_right_write_class'>
         <div style={{ fontSize: "17px", fontWeight: "500" }}>Cân bằng tải trong hệ thống bằng phương pháp "Load Balance".</div>
         <div style={{ display: "flex", gap: "30px", marginTop: "5px" }}>
          <div style={{ display: "flex", gap: "5px", fontSize: "14px", fontWeight: "500" }}>
           <span>Đăng bởi:</span>
           <span>Hải PD</span>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "15px", fontWeight: "500", textAlign: "center" }}>
           <span><ChatBubbleOutlineIcon style={{ color: "red", fontSize: "17px", marginTop: "3px" }} /></span>
           <span>5</span>
          </div>
         </div>
        </div>
       </div>
      </div>
      <div className='write_class_homePage_child'>
       <img src='https://networkpro.vn/wp-content/uploads/2021/05/can-bang-tai-5.png' />
       <div className='bottom_write_class'>
        <div className='bottom_left_write_class'>
         <div className='caculate_homePage'>
          <div className="month_homePage">Tháng 11</div>
          <div className="date_homePage">06</div>
         </div>
        </div>
        <div className='bottom_right_write_class'>
         <div style={{ fontSize: "17px", fontWeight: "500" }}>Cân bằng tải trong hệ thống bằng phương pháp "Load Balance".</div>
         <div style={{ display: "flex", gap: "30px", marginTop: "5px" }}>
          <div style={{ display: "flex", gap: "5px", fontSize: "14px", fontWeight: "500" }}>
           <span>Đăng bởi:</span>
           <span>Hải PD</span>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "15px", fontWeight: "500", textAlign: "center" }}>
           <span><ChatBubbleOutlineIcon style={{ color: "red", fontSize: "17px", marginTop: "3px" }} /></span>
           <span>5</span>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>

 )
}

export default Home