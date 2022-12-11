import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from '../../helper/axiosImage'
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, Button, TextareaAutosize } from "@material-ui/core";
function UploadFile({ files, setFiles, removeFile }) {
 const dispatch = useDispatch();
 const uploadHandler = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  file.isUploading = true;
  setFiles([...files, file])

  // upload file
  const formData = new FormData();
  formData.append("file_document", file);
  console.log("file:", file)
  try {
   let data = await axios.post('/teacher/document/create_file_document', formData);
   if (data.data.code === 200) {
    let document = { pathFileDocument: data.data.data, nameDocumentClass: file.name }
    console.log("data:", data)
    file.isUploading = false;
    setFiles([...files, file]);

    dispatch({
     type: 'UPLOAD_DOCUMENT_SUCCESS',
     payload: document
    })
   }
  } catch (error) {

  }
 }

 return (
  <>
   <div className='tai-lieu-mon-hoc'>
    <div style={{ marginLeft: "20px" }}>
     <p>Tài liệu môn học</p>
    </div>
    <div style={{ padding: "20px 20px" }}>
     <Button style={{ marginRight: "20px" }} variant="contained" component="label" >
      Thêm tài liệu lớp học
      <input hidden multiple type="file" onChange={uploadHandler} />
     </Button>
    </div>
   </div>
  </>
 )
}

export default UploadFile

