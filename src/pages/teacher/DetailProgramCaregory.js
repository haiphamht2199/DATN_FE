import React, { useState, useEffect, useCallback, useMemo } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Typography, Box, Button } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BatteryCharging30Icon from '@mui/icons-material/BatteryCharging30';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import axios from '../../helper/axios';
import ProgramDetail from './ProgramDetail';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Paper from '@mui/material/Paper';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Menu from '@mui/material/Menu';
import { alpha, styled } from '@mui/material/styles';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditInfomationGroup from '../../component/modal/EditInfomationGroup';
import EvaluateForGroup from '../../component/modal/EvaluateForGroup';
import EditStudentForGroup from '../../component/modal/EditStudentForGroup';
import EditLessonAndTask from '../../component/modal/EditLessonAndTask';
import AddStudentForGrou from '../../component/modal/AddStudentForGrou';
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
function DetailProgramCaregory() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [detaiProgram, setDetailProgram] = useState("");
  const [exspand, setExspand] = useState(new Map());
  const [exspandTask, setExspandTask] = useState(new Map());
  const [hello, setHello] = useState(false);
  const [numberGroup, setNumberGroup] = useState(new Map());
  const [open, setOpen] = React.useState(false);
  const [programId, setProgramId] = useState("");
  const [openModalLessonAndTask, setOpenModalLessonAndTask] = useState(false);
  const [editNameActive, setEditNameActive] = useState("");
  const nameClass = useSelector(state => state._class.classDetail.name_class)
  const handleClickOpen = useCallback((id) => {
    setProgramId(id)
    setOpen(true);

  }, [setProgramId, programId]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteLesson = useCallback(() => {
    console.log("programId:", programId)
  }, [programId])
  useEffect(() => {
    const program_id = searchParams.get("program_category_id");
    async function fetchData(program_id) {
      if (program_id) {
        let programCategoryDetailRes = await axios.get(`/teacher/sys/program_category/detail?program_id=${program_id}`);
        if (programCategoryDetailRes.data.code === 200) {
          setDetailProgram(programCategoryDetailRes.data.data)
        }
      }
      // ...
    }
    if (program_id) {
      fetchData(program_id);
    }
  }, [setDetailProgram]);

  useEffect(() => {
    let descript = document.querySelectorAll('.descript_lession_program');
    let descriptTask = document.querySelectorAll('.cont_descipt_task');
    if (descript.length && detaiProgram.lesson_list.length) {
      descript.forEach((des, index) => {
        des.innerHTML = detaiProgram.lesson_list[index].description;
        detaiProgram.lesson_list[index].isspan = false;
        let data = exspand;
        data.set(index, false)
        setExspand(data)
      })
    }
    if (descriptTask.length && detaiProgram.task_list.length) {
      descriptTask.forEach((des, index) => {
        des.innerHTML = detaiProgram.task_list[index].description;
      })
    }

  }, [detaiProgram, setExspand]);
  const handleEpandDescript = useCallback(index => {
    detaiProgram.lesson_list[index].isspan = true;
    setDetailProgram(detaiProgram);

  }, [setDetailProgram, detaiProgram]);
  const handleMoreDescript = useCallback((index) => {
    let data = exspand;
    data.set(index, !data.get(index))
    setExspand(data);
    setHello(!hello);
    // const descriptWate = document.querySelectorAll(".descript_lession_program");
    // if (descriptWate.length) {
    //  descriptWate[index].style.display = "none"
    // }

  }, [detaiProgram, exspand, hello]);
  const handleMoreDescriptTask = useCallback(async (index, task) => {
    let listGroupTaskRes = await axios.get(`/teacher/tasks/list_task_groups?page=0&size=10&taskId=${task.taskId}`);
    if (listGroupTaskRes.data.code === 200) {
      detaiProgram.task_list[index].listGroup = listGroupTaskRes.data.data.results
      setDetailProgram(detaiProgram)
    }
    let data = exspandTask;
    data.set(index, !data.get(index))
    setExspandTask(data);
    setHello(!hello);
    // const descriptWate = document.querySelectorAll(".descript_lession_program");
    // if (descriptWate.length) {
    //  descriptWate[index].style.display = "none"
    // }

  }, [detaiProgram, exspandTask, hello, setDetailProgram]);
  const exspanShow = () => {
    return (
      <ExpandLessIcon className='edit_new_lesstion' />
    )
  }

  const changeNumberGroup = useCallback((index, value) => {
    if (parseInt(value) <= 0) {
      value = "0";
    }
    let data = numberGroup;
    data.set(index, value);
    setNumberGroup(data)
    setHello(!hello);
  }, [numberGroup, hello]);
  const hancleDivideGroup = useCallback(async (task, index) => {
    const classId = parseInt(searchParams.get("class_id"));
    let numberGroupId = parseInt(numberGroup.get(index));
    let type = task.typeGroupStudent ? task.typeGroupStudent : "1";
    let taskId = task.taskId;
    if (classId && numberGroupId && type && taskId) {
      let data = {
        classId: classId,
        numberGroup: numberGroupId,
        type: type,
        taskId: taskId
      }
      let divideGroupRes = await axios.post('/teacher/tasks/process_divide_group', data);
      if (divideGroupRes.data.code === 200) {
        toast.success("Divide group success!", {
          position: toast.POSITION.TOP_CENTER
        });
      }

    }
  }, [numberGroup, hello]);
  const handleEditLessAndTask = useCallback((lession) => {
    setOpenModalLessonAndTask(true);
    setEditNameActive(lession)
  }, [setOpenModalLessonAndTask, setEditNameActive])
  function Row(props) {
    const [row, setRow] = useState(props.row);
    console.log("row:", row)
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openChange, setOpenChange] = useState(false);
    const [openAction, setOpenAction] = useState(false);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [openAction1, setOpenAction1] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, SetModalOpen] = useState(false);
    const [modalEvaluateOpen, SetModalEvaluateOpen] = useState(false);
    const [modalEvaluateStudentOpen, SetModalEvaluateStudentOpen] = useState(false);
    const [taskGroup, setTaskGroup] = useState("");
    const [studentId, setStudentId] = useState("");
    const [openModalAddStudent, SetModalOpenAddStudent] = useState(false)
    const [data, setData] = useState("");
    const handleAddStudent = useCallback(() => {
      SetModalOpen(!modalOpen);
      setAnchorEl(null);
      setOpenAction(false);
      setData(taskGroup)
    }, [taskGroup, setData]);
    const handleAddStudentGroup = useCallback(() => {
      SetModalOpenAddStudent(true)
      setAnchorEl(null);
      setOpenAction(false);
      setData(taskGroup)
    }, [taskGroup, setData])
    const handleOenModelEvaluate = useCallback(() => {
      SetModalEvaluateOpen(!modalOpen);
      setAnchorEl(null);
      setOpenAction(false);
      setData(taskGroup)
    })
    const handleEditStudent = useCallback(() => {
      SetModalEvaluateStudentOpen(!modalEvaluateStudentOpen);
      setAnchorEl1(null);
      setOpenAction1(false);
      setData(taskGroup);
    }, [taskGroup, setData, modalEvaluateStudentOpen, SetModalEvaluateStudentOpen])
    const handleClick1 = useCallback((event, row) => {
      setOpenAction1(!openAction);
      setAnchorEl1(event.currentTarget);
      setStudentId(row.task_student_detail_id)
    }, [setStudentId]);
    const handleClick = useCallback((event, row) => {
      setOpenAction(!openAction);
      setAnchorEl(event.currentTarget);
      setTaskGroup(row)
    }, [setTaskGroup]);
    const handleClose = (anchorEl, modalOpenEditStudent) => {

      setAnchorEl(null);
      setOpenAction(false)
    };
    const handleClose2 = (anchorEl, modalOpenEditStudent) => {

      setAnchorEl1(null);
      setOpenAction1(false)
    };
    const handlehetListStudentForGroup = useCallback(async id => {
      let listStudentRes = await axios.get(`/teacher/tasks/get_students_details?task_group_id=${id}`);
      if (listStudentRes.data.code === 200) {
        row.listStudent = listStudentRes.data.data;
        setRow(row);
        setOpen(!open)
      }

    }, [row, setRow, setOpen, open]);
    useEffect(() => {

      if (document.querySelector(`.content_task_student${row.task_group_id}`)) {

        document.querySelector(`.content_task_student${row.task_group_id}`).innerHTML = row.content
      }
    }, [row])
    const handleClose1 = () => {
      setOpenDelete(false);
    };
    const handleClose3 = () => {
      setOpenChange(false);
    };
    const handleOenModalDelete = () => {
      setOpenDelete(true);
      setAnchorEl(null);
      setOpenAction(false)
    };
    const handleOenModalChange = () => {
      setOpenChange(true);
      setAnchorEl(null);
      setOpenAction(false)
    };

    const handleDeleteTask = useCallback(async () => {
      if (taskGroup) {
        try {
          console.log("ajsd:", taskGroup)
          let successRes = await axios.delete(`/teacher/tasks?/delete_task=${taskGroup.task_group_id}`);
          console.log("successRes:", successRes)
          if (successRes.data.code === 200) {
            toast.success("Delete task detail success", {
              position: toast.POSITION.TOP_CENTER
            });
          }
          setOpenDelete(false);
        } catch (error) {
          toast.error("could not delete task detail ", {
            position: toast.POSITION.TOP_CENTER
          });
          setOpenDelete(false);
        }

      }
    }, [taskGroup])
    const handleChangeTask = useCallback(async () => {
      if (taskGroup) {
        try {

          let successRes = await axios.put(`/teacher/tasks/change_status_task_group?task_group_id=${taskGroup.task_group_id}`);
          console.log("successRes:", successRes)
          if (successRes.data.code === 200) {
            toast.success("Change status task group success!", {
              position: toast.POSITION.TOP_CENTER
            });
          }
          setOpenChange(false);
        } catch (error) {
          toast.error("could not change status task group ", {
            position: toast.POSITION.TOP_CENTER
          });
          setOpenChange(false);
        }

      }
    }, [taskGroup])
    return (
      <React.Fragment>
        <Dialog
          open={openDelete}

          keepMounted
          onClose={handleClose1}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"B???n c?? ch???c ch???n mu???n x??a kh??ng"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose1}>H???y</Button>
            <Button onClick={handleDeleteTask}>?????ng ??</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openChange}

          keepMounted
          onClose={handleClose3}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"B???n c?? ch???c ch???n mu???n thay ?????i tr???ng th??i kh??ng"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose2}>H???y</Button>
            <Button onClick={handleChangeTask}>?????ng ??</Button>
          </DialogActions>
        </Dialog>
        <EditInfomationGroup openModal={modalOpen} SetModalOpen={SetModalOpen} row={data} setRow={setData} />
        <EvaluateForGroup openModal={modalEvaluateOpen} SetModalOpen={SetModalEvaluateOpen} row={data} setRow={setData} />
        <EditStudentForGroup openModal={modalEvaluateStudentOpen} SetModalOpen={SetModalEvaluateStudentOpen} row={data} studentId={studentId} setRow={setData} />
        <AddStudentForGrou openModalAddStudent={openModalAddStudent} SetModalOpenAddStudent={SetModalOpenAddStudent} row={data} />
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => { handlehetListStudentForGroup(row.task_group_id); }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" align="center" scope="row">
            {row.name_task_group}
          </TableCell>
          <TableCell align="center" className={"content_task_student" + row.task_group_id} >{row.content}</TableCell>
          <TableCell align="center">{row.status ? "H???at ?????ng" : "Kh??ng ho???t ?????ng"}</TableCell>
          <TableCell align="center">{row.level ? row.level : "-"}</TableCell>
          <TableCell align="center"><SettingsIcon style={{ cursor: "pointer" }} className="iconSetting" onClick={(e) => handleClick(e, row)} /></TableCell>
          <div>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={openAction}
              onClose={handleClose}
            >

              <MenuItem disableRipple onClick={handleAddStudent}>
                <EditIcon />
                Ch???nh s???a
              </MenuItem>
              <MenuItem disableRipple onClick={handleOenModalChange}>
                <AutorenewIcon />
                ?????i tr???ng th??i
              </MenuItem>
              <MenuItem disableRipple onClick={handleAddStudentGroup}>
                <ControlPointIcon />
                Th??m sinh vi??n
              </MenuItem>

              <MenuItem onClick={handleOenModalDelete} disableRipple>
                <DeleteIcon />
                X??a th??ng tin
              </MenuItem>

              <MenuItem disableRipple onClick={handleOenModelEvaluate}>
                <EditIcon />
                ????nh gi?? nh??m
              </MenuItem>
            </StyledMenu>
          </div>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>H??? v?? t??n</TableCell>
                      <TableCell>M?? s??? sinh vi??n</TableCell>
                      <TableCell align="right">T??i li???u n???p</TableCell>
                      <TableCell align="right">Th???i gian n???p</TableCell>
                      <TableCell align="right">Tr???ng th??i n???p</TableCell>
                      <TableCell align="right">Tr???ng th??i</TableCell>
                      <TableCell align="right">??i???m</TableCell>
                      <TableCell align="right">Thao t??c</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.listStudent && row.listStudent.length && row.listStudent.map((student, index) => (
                      <TableRow className={student.is_captain === 1 ? "is_captain" : ""}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{student.name_student}</TableCell>
                        <TableCell align="center">{student.code_student}</TableCell>
                        <TableCell align="center">
                          {student.path_file ? student.path_file : "--"}
                        </TableCell>
                        <TableCell align="center">--</TableCell>
                        <TableCell align="center">{student.status_assign > 0 ? "????ng h???n" : "Ch??a n???p "}</TableCell>
                        <TableCell align="center">{student.status ? "Ho???t ?????ng" : "Kh??ng ho???t ?????ng"}</TableCell>
                        <TableCell align="center">{student.point}</TableCell>
                        <TableCell align="center"><SettingsIcon style={{ cursor: "pointer" }} className="iconSetting" onClick={(e) => handleClick1(e, student)} /></TableCell>
                        <div>
                          <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                              'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl1}
                            open={openAction1}
                            onClose={handleClose2}
                          >

                            <MenuItem disableRipple onClick={handleEditStudent}>
                              <EditIcon />
                              Ch???nh s???a
                            </MenuItem>
                            <MenuItem disableRipple>
                              <AutorenewIcon />
                              ?????i tr???ng th??i
                            </MenuItem>
                          </StyledMenu>
                        </div>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  }

  return (
    <>
      <Dialog
        open={open}

        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"B???n c?? ch???c ch???n mu???n x??a kh??ng"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>H???y</Button>
          <Button onClick={handleDeleteLesson}>?????ng ??</Button>
        </DialogActions>
      </Dialog>
      <EditLessonAndTask openModalLessonAndTask={openModalLessonAndTask} setOpenModalLessonAndTask={setOpenModalLessonAndTask} editNameActive={editNameActive} />
      <ToastContainer />
      {
        detaiProgram.program_category_id && exspand && <div className='detail_class'>
          <div className='url_lession_top'>
            <div >
              <AddToPhotosIcon className='icon_lession' />
            </div>
            <div className='url_lession_detail'>
              <div className='content_url'>Danh s??ch l???p / {nameClass}/Chi ti???t l???p h???c/Ch????ng tr??nh gi???ng day</div>
            </div>
          </div>
          <div className='content_program_category_detail'>
            <Card className='card_ctd_detail'>
              <div className='information_program_category_detail_top'>
                <div className='detail_info_over'>
                  <div className='detail_top'>
                    <div className="detail_top-left">
                      <div className='label_name_program_category'>
                        T??n l???p h???c:
                      </div>
                      <div className="label_name_program_category"> {detaiProgram.name_program}</div>
                    </div>
                    <div className="detail_top-right">
                      <div className='label_name_program_category'>
                        Tr???ng th??i:
                      </div>
                      <div className="label_name_program_category"> C??ng khai </div>
                    </div>
                  </div>
                  <div className='detail_bottom'>
                    <div className="detail_bottom-left">
                      <div className='label_name_program_category'>
                        Th???i gian ho???t ?????ng:
                      </div>
                      <div className="label_name_program_category"> 29/10/2022- 20/12/2022</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='array_lesson_program_category'>
                <div className='new_content_lession'>
                  <div className='left_new_lession'>
                    <div className='icon_new_lession'>
                      <EventNoteIcon className='note_new_lession' />
                    </div>
                    <div className='name_new_lession'>
                      <p>B??i h???c</p>
                    </div>
                  </div>
                </div>
                <div className='content_array_lesson_program_category'>
                  {
                    detaiProgram.lesson_list && exspand && detaiProgram.lesson_list.length && detaiProgram.lesson_list.map((lesson, index) => (
                      <div>
                        <div className='new_content_lession_rogram_category'>
                          <div className='left_new_lession'>
                            <div className='action_expand' onClick={() => handleMoreDescript(index)}>
                              {exspand.get(index) ? <ExpandLessIcon className='edit_new_lesstion' /> : <ExpandMoreIcon className='edit_new_lesstion' />}
                            </div>
                            <div className='index_new_lession'>
                              #{lesson.indexInProgram}
                            </div>
                            <div className='name_new_lession'>
                              <p>{lesson.nameLesson}</p>
                            </div>
                          </div>
                          <div className='action_new_lession'>
                            <EditIcon className='edit_new_lesstion' onClick={() => handleEditLessAndTask(lesson)} />
                            <DeleteIcon className='delete_new_lesstion' onClick={() => handleClickOpen(detaiProgram.program_category_id)} />
                          </div>



                        </div>
                        <div className='descript_lession_program' style={{ display: exspand.get(index) === true ? "block" : "none", cursor: "pointer" }} >

                        </div>
                      </div>

                    ))
                  }
                </div>
                <div className='new_content_lession'>
                  <div className='left_new_lession'>
                    <div className='icon_new_lession'>
                      <BatteryCharging30Icon className='Battery_new_lession' />
                    </div>
                    <div className='name_new_lession'>
                      <p>Ho???t ?????ng</p>
                    </div>
                  </div>
                </div>
                <div className='content_array_lesson_program_category'>
                  {
                    detaiProgram.task_list && exspand && detaiProgram.task_list.length && detaiProgram.task_list.map((task, index) => (
                      <div>
                        <div className='new_content_lession_rogram_category'>
                          <div className='left_new_lession'>
                            <div className='action_new_lession' onClick={() => handleMoreDescriptTask(index, task)}>
                              {exspandTask.get(index) ? <ExpandLessIcon className='edit_new_lesstion' /> : <ExpandMoreIcon className='edit_new_lesstion' />}
                            </div>
                            <div className='index_new_lession'>
                              #{index + 1}
                            </div>
                            <div className='name_new_lession'>
                              <p>{task.nameTask}</p>
                            </div>
                          </div>
                          <div className='action_new_lession'>
                            <EditIcon className='edit_new_lesstion' />
                            <DeleteIcon className='delete_new_lesstion' />
                          </div>

                        </div>
                        <div className='descript_lession_task' style={{ display: exspandTask.get(index) === true ? "block" : "none", cursor: "pointer" }} >
                          <div className='detail_info_over detail_infor_task'>
                            <div className='detail_top detail_top_task'>
                              <div className="detail_top-left">
                                <div className='label_name_program_category'>
                                  T??n l???p ho???t ?????ng:
                                </div>
                                <div className="label_name_program_category"> {task.nameTask}</div>
                              </div>
                              <div className="detail_top-right">
                                <div className='label_name_program_category'>
                                  Th???i l?????ng ho???t ?????ng:
                                </div>
                                <div className="label_name_program_category"> {task.timeDuration} </div>
                              </div>
                            </div>
                            <div className='detail_bottom detail_bottom_task'>
                              <div className="detail_bottom-left">
                                <div className='label_name_program_category'>
                                  S??? l?????ng nh??m:
                                </div>
                                <div className="label_name_program_category">{task.listGroup && task.listGroup.length ? task.listGroup.length : "0"}</div>
                              </div>
                              <div className="detail_bottom-right_task">
                                <div className='label_name_program_category'>
                                  Y??u c???u ho??n th??nh:
                                </div>
                                <div className="label_name_program_category">{task.status ? "B???t bu???c" : "Kh??ng b???t bu???c"} </div>
                              </div>
                            </div>
                            <div className='descipt_task'>
                              <div className='name_descript_task'>N???i dung ho???t ?????ng:</div>
                              <div className='cont_descipt_task'></div>
                            </div>
                            <div className='array_list_team_task'>
                              <div className='name_descript_task'>Danh s??ch nh??m:</div>
                              <div className='search_task'>

                                <TextField
                                  name="nameNewLession"
                                  variant="outlined"
                                  fullWidth
                                  className='search_task_inut'
                                  placeholder='Nh???p t??n ho???t ?????ng'
                                />

                                <div >
                                  <Button className='submit_search_task' variant="contained" startIcon={<SearchIcon />}>
                                    T??m ki???m
                                  </Button>
                                </div>
                              </div>
                              <div className='action_task_program_class'>
                                <div className='action_divide_group'>
                                  <div>Ki???u chia nh??m:</div>
                                  <div className='form_control_status'>
                                    <FormControl variant="outlined" fullWidth  >

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="bloodGroup"
                                        fullWidth
                                        value={task.typeGroupStudent ? task.typeGroupStudent.toString() : "1"}


                                      >
                                        <MenuItem value="1">T??? ?????ng chia nh??m </MenuItem>

                                      </Select>
                                    </FormControl>
                                  </div>
                                </div>
                                <div className='action_divide_group'>
                                  <div>S??? l?????ng nh??m:</div>

                                  <div className='input_amount_group'>

                                    <TextField
                                      name="nameNewLession"
                                      variant="outlined"
                                      className='action_divide_group_input'
                                      placeholder='Nh???p s??? l?????ng nh??m'
                                      type="number"
                                      value={numberGroup.get(index) ? numberGroup.get(index) : ""}
                                      onChange={(e) => changeNumberGroup(index, e.target.value)}
                                    />

                                  </div>
                                  <div >
                                    <Button onClick={() => hancleDivideGroup(task, index)} className='submit_search_task' variant="contained" startIcon={<KeyboardReturnIcon />}>
                                      Chia nh??m
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className='list_group_task'>
                                {
                                  task.listGroup && task.listGroup.length ?
                                    <TableContainer component={Paper}>
                                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Chi ti???t </TableCell>
                                            <TableCell align="right">T??n nh??m </TableCell>
                                            <TableCell align="right">N???i dung ho???t ?????ng</TableCell>
                                            <TableCell align="right">Tr???ng th??i </TableCell>
                                            <TableCell align="right">????nh gi?? </TableCell>
                                            <TableCell align="right">Thao t??c </TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {task.listGroup.map((group, index) => (
                                            // <TableRow
                                            //   key={row.name}
                                            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            // >
                                            //   <TableCell  onClick={() => setOpen(!open)} align="left" style={{ paddingRight: "30px" }}><SettingsIcon style={{ cursor: "pointer" }} className="iconSetting" /></TableCell>
                                            //   <TableCell align="center">{row.name_task_group}</TableCell>
                                            //   <TableCell align="center">{row.content ? row.content : "-"}</TableCell>
                                            //   <TableCell align="center">{row.status ? "H???at ?????ng" : "Kh??ng ho???t ?????ng"}</TableCell>
                                            //   <TableCell align="center">{row.level ? row.level : "-"}</TableCell>
                                            //   <TableCell align="center" style={{ paddingRight: "30px" }}><SettingsIcon style={{ cursor: "pointer" }} className="iconSetting" /></TableCell>
                                            // </TableRow>
                                            <Row key={group.task_group_id} row={group} index={index} />
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>

                                    : ""
                                }

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </Card>
          </div>
        </div>
      }

    </>
  )
}

export default DetailProgramCaregory