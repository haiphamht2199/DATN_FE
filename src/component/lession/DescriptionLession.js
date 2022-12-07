import React, { useState, useEffect, useCallback } from 'react';
import { useQuill } from 'react-quilljs';
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, Button, TextareaAutosize } from "@material-ui/core";
import ImageIcon from '@mui/icons-material/Image';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import './test.css';
const formats = [
 "header",
 "font",
 "size",
 "bold",
 "italic",
 "underline",
 "align",
 "strike",
 "script",
 "blockquote",
 "background",
 "list",
 "bullet",
 "indent",
 "link",
 "image",
 "video",
 "color",
 "code-block"
];
function DescriptionLession() {
 const dispatch = useDispatch();
 const lession = useSelector((state) => state.lession);
 const _class = useSelector((state) => state._class);
 const image = useSelector((state) => state._class.pathFileImage);
 const [value, setValue] = useState("")
 let startDate = useSelector((state) => state._class.dateTimeStart);
 let endDate = _class.dateTimeEnd;
 const [description, setDescription] = useState(useSelector((state) => state._class.description));

 const changeStartDate = (value) => {
  startDate = value;
  dispatch({
   type: 'CHANGE_START_DATE',
   value: value
  })
 }
 const changeEndDate = useCallback((value) => {
  endDate = value;
  dispatch({
   type: 'CHANGE_END_DATE',
   value: value
  })
 }, [endDate])

 const handleChangeDecription = useCallback(value => {
  setDescription(value)
  dispatch({
   type: 'CHANGE_DECRIPTION',
   description: value
  })
 }, [description])
 useEffect(() => {
  dispatch({
   type: "GET_ALL_MODULE_CLASS"
  })
 }, [])
 const handleImage = (e) => {
  let file = e.target.files[0];
  const imageData = new FormData();
  imageData.append("file_image_class", file);
  setValue({
   ...value,
   filePreview: URL.createObjectURL(file)
  })
  dispatch({
   type: 'UPLOAD_IMAGE_CLASS',
   payload: imageData
  })
 }

 const AddNewClassBtn = useCallback(() => {
  console.log("_class:", _class)
 }, [_class])
 return (
  <>
   <div
    className="content  active-content"
   >
    <div className='image_class'>
     <div className='content_image'>
      {
       image && <img src={value.filePreview} alt="updateimage" className='image_class_preview'></img>
      }

     </div>
     {
      !image && <div className='icon_image'>
       <ImageIcon className='icon_customize_image' />

       <p style={{ fontWeight: "500", marginBottom: "10px" }}>Tải hình ảnh lớp học</p>
       <Button variant="contained" component="label" >
        Chọn thư mục
        <input onChange={handleImage} hidden multiple type="file" />
       </Button>

      </div>
     }

    </div>
    <div className='descript_class'>
     <InputLabel required >Mô tả môn hoc</InputLabel>
     <div style={{ width: "100%", height: '300px' }}>
      <ReactQuill
       theme="snow"
       value={description}
       onChange={handleChangeDecription}
       placeholder={" Nhập mô tả lớp học tại đây"}
       // modules={modules('t1')}
       formats={formats}
       style={{ height: "300px" }}
      />
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
       value={startDate}
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
       value={endDate}
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
     <Button variant="contained" onClick={AddNewClassBtn}>Tạo lớp học</Button>
    </div>
   </div>
  </>
 )
}

export default DescriptionLession