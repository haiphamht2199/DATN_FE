import React, { useState, useEffect, useCallback } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Select, FormControl, Typography, Button, TextField, InputLabel, MenuItem, Grid } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import { useSearchParams } from "react-router-dom";
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
function ValidateEmail(email) {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}
const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    // padding: theme.spacing(2),
    position: 'absolute',
    top: "0%",
    width: "50%",
    height: "auto",
    marginBottom: "20px",
  },
  dialogTitle: {
    paddingRight: '10px',
    background: "#385cce",
    color: "white"
  }
}))

function EditStudent(props) {
  const dispatch = useDispatch();
  let openEditStudent = useSelector(state => state.modal.editStudent);
  let EditStudent = useSelector(state => state._class.editStudent);

  const [studentId, setStudentId] = useState(EditStudent.code_student);
  const [studentName, setStudentName] = useState(EditStudent.name_student);
  const [studentEmail, setStudenEmail] = useState(EditStudent.email);
  const [studentStatus, setStudentStatus] = useState(EditStudent.status);
  const [point, setPoint] = useState(EditStudent.point ? EditStudent.point : "");
  const [isLoading, setisLoading] = useState(false);
  const [evaluate, setEvaluate] = useState(EditStudent.evaluate ? EditStudent.evaluate : "");
  const [isLoading1, setisLoading1] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [validateEmail, setValidateEmail] = useState(true);
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleCloseModal = (openEditStudent) => {
    openEditStudent = false
    dispatch({
      type: 'CHANGE_CLOSE_MODAL',
      payload: openEditStudent
    })
  }
  const editSaveStudent = useCallback(() => {
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

    if (studentId && studentName && validateEmail && studentEmail) {

      let id = EditStudent.id;
      let editDateClass = "10:00,29/10/2022";
      let data = {
        classStudentId: EditStudent.class_student_id,
        codeStudent: studentId,
        nameStudent: studentName,
        // editDateClass: editDateClass,
        emailStudent: studentEmail,
        status: studentStatus,
        // point: point,
        // evaluate: evaluate
      };
      setEvaluate("")
      dispatch({
        type: "EDIT_SAVE_STUDENT_BY_CLASS_ID_REST",
        data: data
      });
      dispatch({
        type: "DELETE_EDIT_STUDENT",
      })
      dispatch({
        type: "CLOSE_MODAL_EDIT_STUDENT",
        payload: false
      })
    }
  }, [studentId, studentName, studentEmail, studentStatus, isLoading1, isLoading2, validateEmail, point, evaluate]);
  const onChageEvalute = (value) => {
    setEvaluate(value)
  }

  useEffect(() => {
    if (openEditStudent) {
      setStudentId(EditStudent.code_student);
      setStudentName(EditStudent.name_student);
      setStudenEmail(EditStudent.email);
      setStudentStatus(EditStudent.status);
      setPoint(EditStudent.point);
      setEvaluate(EditStudent.evaluate)
    }
  }, [openEditStudent]);

  return (
    EditStudent &&
    <Dialog open={openEditStudent} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, color: "white" }} className="customize_modal">
            Chỉnh sửa thông tin sinh viên
          </Typography>
          < Button
            color="white"
            onClick={() => handleCloseModal(openEditStudent)}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <div className='content_edit'>
          <div className='edit_student_group'>
            <InputLabel className='edit_name_Student' >Mã số sinh viên:</InputLabel>
            <TextField
              fullWidth
              variant="outlined"
              value={studentId ? studentId : ""}
              onChange={(e) => setStudentId(e.target.value)}
            />

          </div>
          {isLoading && <Alert severity="error" style={{ color: "red", marginTop: "-15px", paddingLeft: "15%" }}>Mã số sinh viên không được để trống!</Alert>}


          <div className='edit_student_group'>
            <InputLabel className='edit_name_Student'>Họ và tên </InputLabel>

            <TextField
              fullWidth
              variant="outlined"
              placeholder='Nhập tên sinh viên'
              value={studentName ? studentName : ""}
              onChange={(e) => setStudentName(e.target.value)}
            />

          </div>
          {isLoading1 && <Alert severity="error" style={{ color: "red", marginTop: "-15px", paddingLeft: "15%" }}>Tên sinh viên không được để trống!</Alert>}

          <div className='edit_student_group'>
            <InputLabel className='edit_name_Student'>Địa chỉ email: </InputLabel>

            <TextField
              fullWidth
              variant="outlined"
              placeholder='Nhập địa chỉ email'
              value={studentEmail ? studentEmail : ""}
              onChange={(e) => setStudenEmail(e.target.value)}
            />
          </div>
          {isLoading2 ? <Alert severity="error" style={{ color: "red", marginTop: "-15px", paddingLeft: "15%" }}>Email không được để trống!</Alert> : ""}
          {!validateEmail ? <Alert severity="error" style={{ color: "red", marginTop: "-15px", paddingLeft: "15%" }}>Email không đúng định dạng!</Alert> : ""}


          <div className='edit_student_group'>
            <InputLabel className='edit_name_Student'>File tài liệu: </InputLabel>

            <div className='edit_name_Student'>https://sped/file/resoure/bai_hoc_1/active_1/hai_pd.zip</div>

          </div>
          {
            studentStatus !== null &&
            <div className='edit_student_status_point'>
              <Grid item xs={12}>
                <div className='edit_student_group_status'>
                  <InputLabel className='edit_name_Student'>Trạng thái: </InputLabel>
                  <FormControl variant="outlined"   >

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
                </div>
              </Grid>
              <Grid item xs={6} className="edit_student_point">
                <div className='edit_student_group_status'>
                  <InputLabel className='edit_name_Student'>Điểm: </InputLabel>
                  <FormControl variant="outlined"   >

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="bloodGroup"
                      fullWidth
                      value={point ? point : ""}
                      onChange={(e) => setPoint(e.target.value)}
                    >

                      <MenuItem value="0">0</MenuItem>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="6">6</MenuItem>
                      <MenuItem value="7">7</MenuItem>
                      <MenuItem value="8">8</MenuItem>
                      <MenuItem value="9">9</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid>
            </div>

          }

          <div className='descript_class'>
            <InputLabel  >Đánh giá hoạt động:</InputLabel>
            <div style={{ width: "100%", height: '200px' }}>
              <ReactQuill
                theme="snow"
                value={evaluate ? evaluate : ""}
                onChange={onChageEvalute}
                placeholder={" Nhập đánh giá hoạt động của sinh viên"}
                // modules={modules('t1')}
                formats={formats}
                style={{ height: "200px" }}
              />
            </div>
          </div>
          <div className='Save_cancel_edit'>
            <div className='cancel_edit'>
              <Button variant="outlined">Hủy</Button>
            </div>
            <div className='save_edit'>
              <Button variant="contained" onClick={editSaveStudent}>Lưu</Button>
            </div>
          </div>
        </div>


      </DialogContent>
    </Dialog>
  )
}

export default EditStudent