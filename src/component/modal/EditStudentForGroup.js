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


function EditStudentForGroup(props) {

 const dispatch = useDispatch();
 const [searchParams, setSearchParams] = useSearchParams();
 const { name, openModal, SetModalOpen, row, setRow, studentId } = props;
 const [student, setStudent] = useState("")
 const classes = useStyles();
 const [studentName, setStudentName] = useState("");
 const [studentEmail, setStudenEmail] = useState("");
 const [studentStatus, setStudentStatus] = useState(row.status);
 const [isLoading, setisLoading] = useState(false);
 const [isLoading1, setisLoading1] = useState(false);
 const [isLoading2, setisLoading2] = useState(false);
 const [validateEmail, setValidateEmail] = useState(true);
 const [evaluate, setEvaluate] = useState("");
 const [point, setPoint] = useState("");

 console.log("student:", student);
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
 const changePointStudent = useCallback((value) => {
  if (parseInt(value) < 0) {
   value = 0;
  }
  if (parseFloat(value) > 10) {
   value = 10;
  }
  setPoint(value)
 }, [point, setPoint])
 const addNewStudent = useCallback(async () => {
  if (studentId) {
   setisLoading(false);
  } else {
   setisLoading(true);
  }

  if (studentId) {
   let data = {
    taskStudentDetailId: student.taskStudentDetailId,
    status: studentStatus,
    point: point,
    contentEvaluate: evaluate
   }
   try {
    let editGroupRes = await axios.post('/teacher/tasks/update_task_student_detail', data);
    if (editGroupRes.data.code === 200) {
     toast.success("Update task student detail success!", {
      position: toast.POSITION.TOP_CENTER
     });
    }

    setStudentStatus("1");
    setEvaluate("")
    setTimeout(() => {
     SetModalOpen(false)
    }, 100)
   } catch (error) {
    toast.error("Could not Update task student detail!", {
     position: toast.POSITION.TOP_CENTER
    });
   }


  }
 }, [studentName, studentEmail, studentStatus, isLoading1, isLoading2, validateEmail, evaluate, studentStatus, student, point])
 useEffect(() => {
  if (row) {
   setStudentStatus(row.status !== null ? row.status.toString() : "");
  }
 }, [row]);
 useEffect(() => {
  if (studentId) {

   async function fetchData(program_id) {
    if (program_id) {
     let programCategoryDetailRes = await axios.get(`/teacher/tasks/get_task_student_detail?student_detail_id=${program_id}`);

     console.log("programCategoryDetailRes:", programCategoryDetailRes)
     if (programCategoryDetailRes.data.code === 200) {
      setStudent(programCategoryDetailRes.data.data)
      setEvaluate(programCategoryDetailRes.data.data.contentEvaluate);
      setStudentStatus(programCategoryDetailRes.data.data.status)
      setPoint(programCategoryDetailRes.data.data.point)
     }
    }
    // ...
   }
   if (studentId) {
    fetchData(studentId);
   }
  }
 }, [studentId, setStudent]);
 return (
  <>
   <ToastContainer />
   <Dialog open={openModal} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
    <DialogTitle className={classes.dialogTitle}>
     <div style={{ display: 'flex' }}>
      <Typography variant="h6" component="div" style={{ flexGrow: 1, color: "white" }}>
       Đánh giá sinh viên trong nhóm
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
      <div className='action_divide_group'>
       <div>Điểm:</div>

       <div className='input_amount_group'>

        <TextField
         name="nameNewLession"
         variant="outlined"
         className='action_divide_group_input'
         placeholder='Nhập điểm'
         type="number"
         value={point}
         onChange={(e) => changePointStudent(e.target.value)}
        />

       </div>

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
          <MenuItem value="1">Hoạt động </MenuItem>
          <MenuItem value="0">Không hoạt động</MenuItem>
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

export default EditStudentForGroup