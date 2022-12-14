import React, { useState, useEffect, useCallback } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Select, FormControl, Typography, Button, TextField, InputLabel, MenuItem, Grid, OutlinedInput } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import { useSearchParams } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import axios from '../../helper/axios'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
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
function ValidateEmail(email) {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}
function AddStudent(props) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { name, openModal, SetModalOpen } = props;
  const classes = useStyles();
  const [listStudent, setListStudent] = useState([]);
  const theme = useTheme();
  const [personName, setPersonName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudenEmail] = useState("");
  const [studentStatus, setStudentStatus] = useState("1");
  const [isLoading, setisLoading] = useState(false);
  const [isLoading1, setisLoading1] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [validateEmail, setValidateEmail] = useState(true);
  console.log("listStudent:", listStudent)
  const handleChange = useCallback(event => {
    const value = event.target.value;
    setPersonName(
      value
    );
    if (listStudent.length) {
      let student = listStudent.find(item => item.code_student === value);
      if (student) {
        setStudentId(student.code_student);
        setStudenEmail(student.email_student);
        setStudentName(student.name_student);
      }
    }
  }, [listStudent]);
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
    if (studentId && studentName && validateEmail && studentEmail) {
      let data = {
        codeStudent: studentId,
        nameStudent: studentName,
        status: studentStatus,
        classId: searchParams.get("class_id"),
        // startClass: "29/10/2022-10:10",
        // statusClass: studentStatus,

      }
      dispatch({
        type: "ADD_NEW_STUDENT_CLASS_ID_ASYNC",
        data: data
      });
      setStudentId("");
      setStudenEmail("");
      setStudentName("");
      setStudentStatus("1");
      setValidateEmail(true);
      setTimeout(() => {
        SetModalOpen(false)
      }, 100)

    }
  }, [studentId, studentName, studentEmail, studentStatus, isLoading1, isLoading2, validateEmail]);
  useEffect(() => {
    if (searchParams.get("class_id")) {

      async function fetchData(program_id) {
        if (program_id) {
          let data = {
            keyword: 75,
            classId: program_id
          }
          let programCategoryDetailRes = await axios.get(`/teacher/manager_student/get_all_student_in_system`, data);

          if (programCategoryDetailRes.data.code === 200) {
            setListStudent(programCategoryDetailRes.data.data);
          }
        }
        // ...
      }

      fetchData(searchParams.get("class_id"));

    }
  }, [searchParams.get("class_id")])
  return (
    <Dialog open={openModal} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, color: "white" }} className="customize_modal">
            Th??m m???i sinh vi??n
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
          <div>
            <FormControl style={{ width: "100%" }}>

              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput placeholder="T??m ki???m sinh vi??n" />}
                MenuProps={MenuProps}
              >
                {listStudent.map((name) => (
                  <MenuItem
                    key={name.id_sys_user}
                    value={name.code_student}
                    style={getStyles(name, personName, theme)}
                  >
                    {name.name_student + "-" + name.code_student}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='edit_name_lession'>
            <InputLabel style={{ marginBottom: "10px" }} required>M?? s??? sinh vi??n</InputLabel>
          </div>
          <div style={{ marginBottom: "20px" }} >
            <TextField
              fullWidth
              variant="outlined"
              placeholder='Nh???p m?? s??? sinh vi??n'
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            {isLoading && <Alert severity="error" style={{ color: "red" }}>M?? s??? sinh vi??n kh??ng ???????c ????? tr???ng!</Alert>}
          </div>
          <div className='edit_name_lession'>
            <InputLabel style={{ marginBottom: "10px" }} required>H??? v?? t??n </InputLabel>
          </div>
          <div style={{ marginBottom: "20px" }} >
            <TextField
              fullWidth
              variant="outlined"
              placeholder='Nh???p t??n sinh vi??n'
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            {isLoading1 && <Alert severity="error" style={{ color: "red" }}>T??n sinh vi??n kh??ng ???????c ????? tr???ng!</Alert>}
          </div>
          <div className='edit_name_lession'>
            <InputLabel style={{ marginBottom: "10px" }} required>?????a ch??? email </InputLabel>
          </div>
          <div style={{ marginBottom: "20px" }} >
            <TextField
              fullWidth
              variant="outlined"
              placeholder='Nh???p ?????a ch??? email'
              value={studentEmail}
              onChange={(e) => setStudenEmail(e.target.value)}
            />
            {isLoading2 ? <Alert severity="error" style={{ color: "red" }}>Email kh??ng ???????c ????? tr???ng!</Alert> : ""}
            {!validateEmail ? <Alert severity="error" style={{ color: "red" }}>Email kh??ng ????ng ?????nh d???ng!</Alert> : ""}
          </div>
          <div>
            <Grid item xs={12}>
              <InputLabel style={{ marginBottom: "10px" }} required>Tr???ng th??i </InputLabel>
              <FormControl variant="outlined" fullWidth  >

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="bloodGroup"
                  fullWidth
                  value={studentStatus}
                  onChange={(e) => setStudentStatus(e.target.value)}
                >
                  <MenuItem value="1">??ang h???c </MenuItem>
                  <MenuItem value="0">Kh??ng h???c</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </div>
          <div className='Save_cancel_edit'>
            <div className='cancel_edit'>
              <Button variant="outlined" onClick={() => { SetModalOpen(false) }}>H???y</Button>
            </div>
            <div className='save_edit'>
              <Button variant="contained" onClick={addNewStudent}>L??u</Button>
            </div>
          </div>
        </div>


      </DialogContent>
    </Dialog>
  )
}

export default AddStudent