import React, { useState, useEffect, useCallback } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Select, FormControl, Typography, Button, TextField, InputLabel, MenuItem, Grid } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import axios from '../../helper/axios'
import 'quill/dist/quill.snow.css';
import Alert from '@mui/material/Alert';
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles(theme => ({
 dialogWrapper: {
  // padding: theme.spacing(2),
  position: 'absolute',
  top: "10%",
  width: "50%",
  height: "auto",
  marginBottom: "20px",
 },
 dialogTitle: {
  paddingRight: '10px',
  background: "blue",
  color: "white"
 }
}))

function EditInfomationGroup(props) {
 const dispatch = useDispatch();
 const [searchParams, setSearchParams] = useSearchParams();
 const { name, openModal, SetModalOpen, row, setRow } = props;
 const classes = useStyles();
 const [studentId, setStudentId] = useState(row.name_task_group);
 const [studentName, setStudentName] = useState("");
 const [studentEmail, setStudenEmail] = useState("");
 const [studentStatus, setStudentStatus] = useState("");
 const [isLoading, setisLoading] = useState(false);
 const [isLoading1, setisLoading1] = useState(false);
 const [isLoading2, setisLoading2] = useState(false);
 const [validateEmail, setValidateEmail] = useState(true);
 const [evaluate, setEvaluate] = useState(row.content);
 console.log("evaluate:", evaluate);
 console.log("row:", row)
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
 const onChageEvalute = (value) => {
  setEvaluate(value)
 }
 const addNewStudent = useCallback(async () => {
  if (studentId) {
   setisLoading(false);
  } else {
   setisLoading(true);
  }

  if (studentId) {
   let data = {
    taskStudentGroupId: row.task_group_id,
    content: evaluate,
    status: studentStatus,
    nameGroup: studentId
   }
   console.log("huhu", data)
   try {
    let editGroupRes = await axios.put('/teacher/tasks/update_task_student_groups', data);
    if (editGroupRes.data.code === 200) {
     let listStudentRes = await axios.get(`/teacher/tasks/get_students_details?task_group_id=${row.task_group_id}`);
     if (listStudentRes.data.code === 200) {
      row.listStudent = listStudentRes.data.data;
      setRow(row)
     }
     toast.success("Update task student groups success!", {
      position: toast.POSITION.TOP_CENTER
     });
    }

    setStudentId("");
    setStudentStatus("1");
    setEvaluate("")
    setTimeout(() => {
     SetModalOpen(false)
    }, 100)
   } catch (error) {
    toast.error("Could not update task student groups!", {
     position: toast.POSITION.TOP_CENTER
    });
   }


  }
 }, [studentId, studentName, studentEmail, studentStatus, isLoading1, isLoading2, validateEmail, evaluate, studentStatus, row])
 useEffect(() => {
  if (row) {
   setStudentId(row.name_task_group);
   setStudentStatus(row.status);
   setEvaluate(row.content)
  }
 }, [row, setStudentStatus]);
 return (
  <>
   <ToastContainer />
   <Dialog open={openModal} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
    <DialogTitle className={classes.dialogTitle}>
     <div style={{ display: 'flex' }}>
      <Typography variant="h6" component="div" style={{ flexGrow: 1, color: "white" }}>
       Chỉnh sửa nhóm
      </Typography>
      < Button
       color="white"
       onClick={() => { SetModalOpen(false) }}>
       <CloseIcon />
      </Button>
     </div>
    </DialogTitle>
    <DialogContent dividers>
     <div className='content_edit'>
      <div className='edit_name_lession'>
       <InputLabel style={{ marginBottom: "10px" }} required>Tên nhóm</InputLabel>
      </div>
      <div style={{ marginBottom: "20px" }} >
       <TextField
        fullWidth
        variant="outlined"
        placeholder='Nhập tên nhóm'
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
       />
       {isLoading && <Alert severity="error" style={{ color: "red" }}>Tên nhóm không được để trống!</Alert>}
      </div>
      <div className='descript_class'>
       <InputLabel  >Mô tả nội dung hoạt động </InputLabel>
       <div style={{ width: "100%", height: '200px' }}>
        <ReactQuill
         theme="snow"
         value={evaluate ? evaluate : ""}
         onChange={onChageEvalute}
         placeholder={" Nhập mô tả nội dung hoạt động tại đây"}
         // modules={modules('t1')}
         formats={formats}
         style={{ height: "200px" }}
        />
       </div>
      </div>
      <div style={{ paddingTop: "25px" }}>
       <Grid item xs={12} mt={3}>
        <InputLabel style={{ marginBottom: "10px" }} required>Trạng thái </InputLabel>
        <FormControl variant="outlined" fullWidth  >

         <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="bloodGroup"
          fullWidth
          value={studentStatus}
          onChange={(e) => setStudentStatus(e.target.value)}
         >
          <MenuItem value={1}>Hoạt động </MenuItem>
          <MenuItem value={0}>Không hoạt động</MenuItem>
         </Select>
        </FormControl>
       </Grid>
      </div>

      <div className='Save_cancel_edit'>
       <div className='cancel_edit'>
        <Button variant="outlined" onClick={() => { SetModalOpen(false) }}>Hủy</Button>
       </div>
       <div className='save_edit'>
        <Button variant="contained" onClick={addNewStudent}>Lưu</Button>
       </div>
      </div>
     </div>


    </DialogContent>
   </Dialog>
  </>
 )
}

export default EditInfomationGroup