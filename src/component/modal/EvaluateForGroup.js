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

function EvaluateForGroup(props) {

 const dispatch = useDispatch();
 const [searchParams, setSearchParams] = useSearchParams();
 const { name, openModal, SetModalOpen, row, setRow } = props;
 const classes = useStyles();
 const [studentId, setStudentId] = useState(row.name_task_group);
 const [studentName, setStudentName] = useState("");
 const [studentEmail, setStudenEmail] = useState("");
 const [studentStatus, setStudentStatus] = useState();
 const [isLoading, setisLoading] = useState(false);
 const [isLoading1, setisLoading1] = useState(false);
 const [isLoading2, setisLoading2] = useState(false);
 const [validateEmail, setValidateEmail] = useState(true);
 const [evaluate, setEvaluate] = useState("");
 const [path, setPath] = useState(row.path ? row.path : "")
 console.log("evaluate:", evaluate);
 console.log("studentStatus:", studentStatus)
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
    studentGroupsId: row.task_group_id,
    contentEvaluate: evaluate,
    level: studentStatus,

   }
   console.log("huhu", data)
   try {
    let editGroupRes = await axios.post('/teacher/tasks/evaluate_student_groups_details', data);
    if (editGroupRes.data.code === 200) {
     let listStudentRes = await axios.get(`/teacher/tasks/get_students_details?task_group_id=${row.task_group_id}`);
     if (listStudentRes.data.code === 200) {
      row.listStudent = listStudentRes.data.data;
      setRow(row)
     }
     toast.success("Evaluate student group success!!", {
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
    toast.error("Could not Evaluate student group!", {
     position: toast.POSITION.TOP_CENTER
    });
   }


  }
 }, [studentId, studentName, studentEmail, studentStatus, isLoading1, isLoading2, validateEmail, evaluate, studentStatus])
 useEffect(() => {
  if (row) {
   setStudentId(row.name_task_group);
   setStudentStatus(row.status !== null ? row.status.toString() : "");
  }
 }, [row]);
 useEffect(() => {
  if (row.task_group_id) {

   async function fetchData(program_id) {
    if (program_id) {
     let programCategoryDetailRes = await axios.get(`/teacher/tasks/evaluate_student_groups_details?student_groups_id=${program_id}`);
     if (programCategoryDetailRes.data.code === 200) {
      row.path = programCategoryDetailRes.data.data.path;
      row.content_evaluate = programCategoryDetailRes.data.data.content_evaluate;
      setEvaluate(programCategoryDetailRes.data.data.content_evaluate);
      setPath(programCategoryDetailRes.data.data.path);
      setStudentStatus(programCategoryDetailRes.data.data.level)
      setRow(row);
      console.log("evaluate:", row)
     }
    }
    // ...
   }
   if (row.task_group_id) {
    fetchData(row.task_group_id);
   }
  }
 }, [row]);
 return (
  <>
   <ToastContainer />
   <Dialog open={openModal} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
    <DialogTitle className={classes.dialogTitle}>
     <div style={{ display: 'flex' }}>
      <Typography variant="h6" component="div" style={{ flexGrow: 1, color: "white" }}>
       Đánh giá nhóm
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
      <div style={{ paddingTop: "25px" }}>
       <Grid item xs={12} mt={3}>
        <InputLabel style={{ marginBottom: "10px" }} required>Đánh giá </InputLabel>
        <FormControl variant="outlined" fullWidth  >

         <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="bloodGroup"
          fullWidth
          value={studentStatus}
          onChange={(e) => setStudentStatus(e.target.value)}
         >
          <MenuItem value="1">level 1 </MenuItem>
          <MenuItem value="2">level 2</MenuItem>
          <MenuItem value="3">level 3</MenuItem>
          <MenuItem value="4">level 4</MenuItem>
         </Select>
        </FormControl>
       </Grid>
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

export default EvaluateForGroup