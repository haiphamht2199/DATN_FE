import React, { useState, useEffect, useCallback } from 'react';
import { useQuill } from 'react-quilljs';
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, Button, TextareaAutosize } from "@material-ui/core";
import ImageIcon from '@mui/icons-material/Image';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
function DescriptionLession() {
 const dispatch = useDispatch();
 const lession = useSelector((state) => state.lession);
 const [image, setImage] = useState(useSelector((state) => state.lession.image))
 console.log("lession:", lession)
 const { quill, quillRef } = useQuill();
 const [startDate, setStartDate] = useState(lession.startDate);
 const [endDate, setEndDate] = useState(lession.endDate);
 const [description, setDecription] = useState(useSelector((state) => state.lession.description));
 console.log("description:", description);
 console.log("type:", typeof (description))
 const changeStartDate = useCallback((value) => {
  setStartDate(value);
  dispatch({
   type: 'CHANGE_START_DATE',
   value
  })
 }, [startDate])
 const changeEndDate = useCallback((value) => {
  setEndDate(value);
  dispatch({
   type: 'CHANGE_END_DATE',
   value
  })
 }, [endDate])
 useEffect(() => {
  if (quill) {
   quill.on('text-change', () => {

    setDecription(quillRef.current.firstChild.innerHTML);
    dispatch({
     type: 'CHANGE_DECRIPTION',
     description
    })
   });

  }

 }, [quill]);
 const handleImage = (files) => {
  console.log("files", files)
  const formData = new FormData();
  formData.append("file", files[0]);
  // formData.append("upload_preset")
 }

 return (
  <>
   <div
    className="content  active-content"
   >
    <div className='image_class'>
     <div className='content_image'>

     </div>
     <div className='icon_image'>
      <ImageIcon className='icon_customize_image' />

      <p style={{ fontWeight: "500", marginBottom: "10px" }}>Tải hình ảnh lớp học</p>
      <Button variant="contained" component="label" >
       Chọn thư mục
       <input onChange={(e) => handleImage(e.target.files[0])} hidden multiple type="file" />
      </Button>

     </div>
    </div>
    <div className='descript_class'>
     <InputLabel required >Mô tả môn hoc</InputLabel>
     <div style={{ width: "100%", height: '300px' }}>
      <div ref={quillRef} />
     </div>

    </div>
    <div className='time_start_end_class'>

     <div className='start_time'>
      <InputLabel required >Ngày bắt đầu</InputLabel>
      <TextField
       name="fullName"
       variant="outlined"
       type='date'
       fullWidth
       onChange={(e) => changeStartDate(e.target.value)}
      />
     </div>
     <div className='end_time'>
      <InputLabel required >Ngày kết thúc</InputLabel>
      <TextField
       name="fullName"
       variant="outlined"
       type='date'
       fullWidth
       onChange={(e) => changeEndDate(e.target.value)}
      />
     </div>

    </div>
    <div className='tai-lieu-mon-hoc'>
     <div style={{ marginLeft: "20px" }}>
      <p>Tài liệu môn học</p>
     </div>
     <div>
      <Button style={{ marginRight: "20px" }} variant="contained">{"+" + " " + "Thêm tài liệu lớp học"}</Button>
     </div>
    </div>
    <div className='next_button'>
     <Button variant="contained">Tiếp tục</Button>
    </div>
   </div>
  </>
 )
}

export default DescriptionLession