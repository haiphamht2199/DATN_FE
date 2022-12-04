import React, { useState, useEffect, useCallback } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Select, FormControl, Typography, Button, TextField, InputLabel, MenuItem, Grid } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
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
function ValidateEmail(email) {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}
function AddStudent(props) {
  const dispatch = useDispatch();
  const { name, openModal, SetModalOpen } = props;
  const classes = useStyles();
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudenEmail] = useState("");
  const [studentStatus, setStudentStatus] = useState("1");
  const [isLoading, setisLoading] = useState(false);
  const [isLoading1, setisLoading1] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [validateEmail, setValidateEmail] = useState(true);
  const addNewStudent = useCallback(() => {
    if (studentId) {
      setisLoading(false);
    } else {
      setisLoading(true);
    }
    if (studentName) {
      setisLoading1(false);
    } else {
      setisLoading1(true);
    }
    if (studentEmail) {
      setisLoading2(false);

      if (!ValidateEmail(studentEmail)) {
        setValidateEmail(false);
      } else {
        setValidateEmail(true);
      }
    } else {
      setisLoading2(true);

    }
    console.log({ studentId, studentName, studentEmail, studentStatus, isLoading1, isLoading2, validateEmail })
    if (studentId && studentName && validateEmail && studentEmail) {
      let id = Math.floor(Math.random() * 101);
      let editDateClass = "10:00,29/10/2022";
      let data = {
        id: id,
        IdStudent: studentId,
        nameStudent: studentName,
        editDateClass: editDateClass,
        gmail: studentEmail,
        startClass: "29/10/2022-10:10",
        statusClass: studentStatus,

      }
      dispatch({
        type: "ADD_NEW_STUDENT_REST",
        data: data
      });
      setStudentId("");
      setStudenEmail("");
      setStudentName("");
      setStudentStatus("1");
      setValidateEmail(true);
      SetModalOpen(false)
    }
  }, [studentId, studentName, studentEmail, studentStatus, isLoading1, isLoading2, validateEmail])
  return (
    <Dialog open={openModal} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, color: "white" }}>
            Thêm mới sinh viên
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
            <InputLabel style={{ marginBottom: "10px" }} required>Mã số sinh viên</InputLabel>
          </div>
          <div style={{ marginBottom: "20px" }} >
            <TextField
              fullWidth
              variant="outlined"
              placeholder='Nhập mã số sinh viên'
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            {isLoading && <Alert severity="error" style={{ color: "red" }}>Mã số sinh viên không được để trống!</Alert>}
          </div>
          <div className='edit_name_lession'>
            <InputLabel style={{ marginBottom: "10px" }} required>Họ và tên </InputLabel>
          </div>
          <div style={{ marginBottom: "20px" }} >
            <TextField
              fullWidth
              variant="outlined"
              placeholder='Nhập tên sinh viên'
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            {isLoading1 && <Alert severity="error" style={{ color: "red" }}>Tên sinh viên không được để trống!</Alert>}
          </div>
          <div className='edit_name_lession'>
            <InputLabel style={{ marginBottom: "10px" }} required>Địa chỉ email </InputLabel>
          </div>
          <div style={{ marginBottom: "20px" }} >
            <TextField
              fullWidth
              variant="outlined"
              placeholder='Nhập địa chỉ email'
              value={studentEmail}
              onChange={(e) => setStudenEmail(e.target.value)}
            />
            {isLoading2 ? <Alert severity="error" style={{ color: "red" }}>Email không được để trống!</Alert> : ""}
            {!validateEmail ? <Alert severity="error" style={{ color: "red" }}>Email không đúng định dạng!</Alert> : ""}
          </div>
          <div>
            <Grid item xs={12}>
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
                  <MenuItem value="1">Đang học </MenuItem>
                  <MenuItem value="0">Không học</MenuItem>
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
  )
}

export default AddStudent