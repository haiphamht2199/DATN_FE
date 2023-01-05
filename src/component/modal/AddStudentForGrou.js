import React, { useState, useEffect, useCallback } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Select, FormControl, Typography, Button, TextField, InputLabel, MenuItem, Grid, OutlinedInput } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import { useSearchParams } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../helper/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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


function AddStudentForGrou(props) {
   const dispatch = useDispatch();
   const [searchParams, setSearchParams] = useSearchParams();
   const { row, openModalAddStudent, SetModalOpenAddStudent } = props;
   const classes = useStyles();
   const [listStudent, setListStudent] = useState([]);
   const [arrayStdudent, setArrayAstudent] = useState([]);
   console.log("rosdsw:", row)
   const theme = useTheme();
   const [personName, setPersonName] = useState([]);

   const handleChange = useCallback(event => {
      const {
         target: { value },
      } = event;
      if (personName.indexOf(value) === -1) {
         setPersonName([...personName, value]);
         let student = listStudent.find(item => item.code_student === value);
         setArrayAstudent([...arrayStdudent, student]);
      } else {
         let data = personName.filter(i => i !== value);
         let student = arrayStdudent.filter(item => item.code_student !== value);
         setArrayAstudent(student);
         setPersonName(data)
      }

      if (listStudent.length) {


      }
   }, [listStudent, setPersonName, personName, setArrayAstudent, arrayStdudent]);


   useEffect(() => {
      if (searchParams.get("class_id")) {

         async function fetchData(program_id) {
            if (program_id) {

               let programCategoryDetailRes = await axios.get(`/teacher/manager_student?page=0&size=100&classId=${program_id}`);
               if (programCategoryDetailRes.data.code === 200) {
                  let data = [];
                  let check = [];
                  if (programCategoryDetailRes.data.data.results.length) {
                     programCategoryDetailRes.data.data.results.forEach(item => {
                        if (check.indexOf(item.code_student) === -1) {
                           check.push(item.code_student);
                           data.push(item)
                        }

                     })
                  }
                  setListStudent(data);
               }
            }
            // ...
         }

         fetchData(searchParams.get("class_id"));

      }
   }, [searchParams.get("class_id")]);
   const handleAddStudentGroup = useCallback(async () => {
      if (row.task_group_id && arrayStdudent.length) {
         let data = {};
         let array = []
         arrayStdudent.forEach(item => {
            array.push({
               codeStudent: item.code_student,
               nameStudent: item.name_student,
               emailStudent: item.email
            });
         });
         if (array.length) {
            data.idTaskStudentGroups = row.task_group_id;
            data.studentsDetail = array;
         }
         if (data) {
            try {
               let StudentRes = await axios.post('/teacher/tasks/add_student_to_group', data);
               console.log("StudentRes:", StudentRes);
               if (StudentRes.data.code === 200) {
                  toast.success("Add more student to group success!", {
                     position: toast.POSITION.TOP_CENTER
                  });
                  SetModalOpenAddStudent(false)
               }
            } catch (error) {
               toast.error(error.response.data.message, {
                  position: toast.POSITION.TOP_CENTER
               });
            }
         }
      }
   }, [row, arrayStdudent])
   return (
      <>
         <ToastContainer />
         <Dialog open={openModalAddStudent} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
               <div style={{ display: 'flex' }}>
                  <Typography variant="h6" component="div" style={{ flexGrow: 1, color: "white" }} className="customize_modal">
                     Thêm mới sinh viên
                  </Typography>
                  < Button
                     color="white"
                     onClick={() => { SetModalOpenAddStudent(false) }}>
                     <CloseIcon />
                  </Button>
               </div>
            </DialogTitle>
            <DialogContent dividers>
               <div className='content_edit'>
                  <div>
                     <FormControl style={{ width: "100%" }}>

                        <Select
                           labelId="demo-multiple-checkbox-label"
                           id="demo-multiple-checkbox"
                           value={personName}
                           onChange={handleChange}
                           input={<OutlinedInput label="Tag" />}
                           renderValue={(selected) => selected.join(', ')}
                           MenuProps={MenuProps}
                        >
                           {listStudent.map((name) => (
                              <MenuItem
                                 multiple
                                 key={name.class_student_id}
                                 value={name.code_student}>
                                 <Checkbox checked={personName.indexOf(name.code_student) > -1} />
                                 <ListItemText primary={name.name_student + "-" + name.code_student} />
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                     <InputLabel  >Danh sách sinh viên</InputLabel>
                     <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
                           <TableHead>
                              <TableRow>
                                 <TableCell align="right">STT</TableCell>
                                 <TableCell align="right">Họ và tên </TableCell>
                                 <TableCell align="right">Mã số sinh viên</TableCell>
                                 <TableCell align="right">Email</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {arrayStdudent.map((row, index) => (
                                 <TableRow key={row.class_student_id}>
                                    <TableCell component="th" scope="row" align="center">
                                       {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{row.name_student}</TableCell>
                                    <TableCell align="center">{row.code_student}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                  </div>

                  <div className='Save_cancel_edit'>
                     <div className='cancel_edit'>
                        <Button variant="outlined" onClick={() => { SetModalOpenAddStudent(false) }}>Hủy</Button>
                     </div>
                     <div className='save_edit'>
                        <Button variant="contained" onClick={handleAddStudentGroup}>Lưu</Button>
                     </div>
                  </div>
               </div>


            </DialogContent>
         </Dialog>
      </>
   )
}

export default AddStudentForGrou