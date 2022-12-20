import React, { useState, useEffect, useCallback } from 'react';
import { useQuill } from 'react-quilljs';
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, Button, TextareaAutosize } from "@material-ui/core";
import ImageIcon from '@mui/icons-material/Image';
import { useDispatch, useSelector } from "react-redux";
import FeedIcon from '@mui/icons-material/Feed';
import axios from 'axios';
import './test.css';
import UploadDocument from '../uploadFile/UploadDocument';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
 let image = useSelector((state) => state._class.pathFileImage);
 const [value, setValue] = useState("")
 let startDate = useSelector((state) => state._class.dateTimeStart);
 let endDate = _class.dateTimeEnd;
 const [description, setDescription] = useState(useSelector((state) => state._class.description));

 console.log("image:", image)
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

  dispatch({
   type: 'CHANGE_DECRIPTION',
   description: value
  })
  setDescription(value)
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
  if (_class.nameClass) {
   if (!startDate) {
    toast.warning("Ngày bắt đầu không được để trống!", {
     position: toast.POSITION.TOP_CENTER
    });
    return
   }
   if (!endDate) {
    toast.warning("Ngày kết thúc không được để trống!", {
     position: toast.POSITION.TOP_CENTER
    });
    return
   }
   dispatch({
    type: 'ADD_NEW_CLASS_REST',
    payload: _class
   });

  } else {
   toast.warning("Tên lớp học không được để trống!", {
    position: toast.POSITION.TOP_CENTER
   });
   return
  }

 }, [_class]);
 useEffect(() => {
  if (_class.success) {
   console.log("success:", _class.success)
   toast.success("Tạo lớp học thành công!", {
    position: toast.POSITION.TOP_CENTER
   });
   setTimeout(() => {
    dispatch({
     type: 'DELETE_SUCCESS_ADD_CLASS'
    })
   }, 100)

  }
 }, [_class.success])

 return (
  <>
   <ToastContainer />
   <div
    className="content  active-content"
   >
    <div className='image_class'>
     <div className='content_image'>
      {
       image && <img src={require(`../../resource/${image}`)} alt="updateimage" className='image_class_preview'></img>
      }

     </div>
     {
      !image && <div className='icon_image'>
       <ImageIcon className='icon_customize_image' />

       <p style={{ fontWeight: "500", marginBottom: "10px" }}>Tải hình ảnh lớp học</p>
       <Button variant="contained" component="label" >
        Chọn thư mục
        <input onChange={handleImage} hidden accept="image/*" multiple type="file" />
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
    {
     <UploadDocument />
    }
    {/* <div className='tai-lieu-mon-hoc'>
     <div style={{ marginLeft: "20px" }}>
      <p>Tài liệu môn học</p>
     </div>
     <div style={{ padding: "20px 20px" }}>
      <Button style={{ marginRight: "20px" }} variant="contained" component="label" >
       Thêm tài liệu lớp học
       <input hidden multiple type="file" />
      </Button>
     </div>
    </div>
    <div className='study_document'>
     <div className='iconAndName_study_document'>
      <div className='icon_Stydy_document'>
       <FeedIcon className='icon_document' />
      </div>
      <div className='name_document'>
       Học liệu tăng cường.zip
      </div>
     </div>
    </div> */}
    <div className='next_button'>
     <Button variant="contained" onClick={AddNewClassBtn}>Tạo lớp học</Button>
    </div>
   </div>
  </>
 )
}

export default DescriptionLession