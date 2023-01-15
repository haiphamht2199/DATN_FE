import React, { useState, useEffect, useCallback } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Typography, Box, Button } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
 const dispatch = useDispatch();
 const courses = useSelector(state => state.student.courses);
 console.log("courses:", courses)
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

    </div>
   </div>
   <div className='list_course_student_home'>
    <div className='title_list_course'>
     Bài viết nổi bật
    </div>
    <div className='content_list_course'>

    </div>
   </div>
  </div>

 )
}

export default Home