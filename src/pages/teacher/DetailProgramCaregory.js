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
    let listGroupTaskRes = await axios.get(`teacher/tasks/list_task_groups?page=0&size=10&taskId=${task.taskId}`);
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
    let type = task.typeGroupStudent;
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
  function Row(props) {
    const [row, setRow] = useState(props.row);
    const [open, setOpen] = useState(false);
    const handlehetListStudentForGroup = useCallback(async id => {
      let listStudentRes = await axios.get(`/teacher/tasks/get_students_details?task_group_id=${id}`);
      if (listStudentRes.data.code === 200) {
        row.listStudent = listStudentRes.data.data;
        setRow(row)
      }

    }, [row, setRow])
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => { handlehetListStudentForGroup(row.task_group_id); setOpen(!open) }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" align="center" scope="row">
            {row.name_task_group}
          </TableCell>
          <TableCell align="center">{row.content ? row.content : "-"}</TableCell>
          <TableCell align="center">{row.status ? "Họat động" : "Không hoạt động"}</TableCell>
          <TableCell align="center">{row.level ? row.level : "-"}</TableCell>
          <TableCell align="center"><SettingsIcon style={{ cursor: "pointer" }} className="iconSetting" /></TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Họ và tên</TableCell>
                      <TableCell>Mã số sinh viên</TableCell>
                      <TableCell align="right">Tài liệu nộp</TableCell>
                      <TableCell align="right">Thời gian nộp</TableCell>
                      <TableCell align="right">Trạng thái nộp</TableCell>
                      <TableCell align="right">Trạng thái</TableCell>
                      <TableCell align="right">Điểm</TableCell>
                      <TableCell align="right">Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.listStudent && row.listStudent.length && row.listStudent.map((student, index) => (
                      <TableRow >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{student.name_student}</TableCell>
                        <TableCell align="center">{student.code_student}</TableCell>
                        <TableCell align="center">
                          {student.path_file ? student.path_file : "--"}
                        </TableCell>
                        <TableCell align="center">--</TableCell>
                        <TableCell align="center">{student.status_assign > 0 ? "Đúng hạn" : "Chưa nộp "}</TableCell>
                        <TableCell align="center">{student.status ? "Hoạt động" : "Không hoạt động"}</TableCell>
                        <TableCell align="center">{student.point}</TableCell>
                        <TableCell align="center"><SettingsIcon style={{ cursor: "pointer" }} className="iconSetting" /></TableCell>
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
        <DialogTitle>{"Bạn có chắc chắn muốn xóa không"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleDeleteLesson}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
      {
        detaiProgram.program_category_id && exspand && <div className='detail_class'>
          <div className='url_lession_top'>
            <div >
              <AddToPhotosIcon className='icon_lession' />
            </div>
            <div className='url_lession_detail'>
              <div className='content_url'>Danh sách lớp / lớp học số 1/Chi tiết lớp học/Chương trình giảng day</div>
            </div>
          </div>
          <div className='content_program_category_detail'>
            <Card className='card_ctd_detail'>
              <div className='information_program_category_detail_top'>
                <div className='detail_info_over'>
                  <div className='detail_top'>
                    <div className="detail_top-left">
                      <div className='label_name_program_category'>
                        Tên lớp học:
                      </div>
                      <div className="label_name_program_category"> {detaiProgram.name_program}</div>
                    </div>
                    <div className="detail_top-right">
                      <div className='label_name_program_category'>
                        Trạng thái:
                      </div>
                      <div className="label_name_program_category"> Công khai </div>
                    </div>
                  </div>
                  <div className='detail_bottom'>
                    <div className="detail_bottom-left">
                      <div className='label_name_program_category'>
                        Thời gian hoạt động:
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
                      <p>Bài học</p>
                    </div>
                  </div>
                  <div className='action_new_lession'>
                    <EditIcon className='edit_new_lesstion' />
                    <DeleteIcon className='delete_new_lesstion' onClick={() => handleClickOpen(detaiProgram.program_category_id)} />
                  </div>
                </div>
                <div className='content_array_lesson_program_category'>
                  {
                    detaiProgram.lesson_list && exspand && detaiProgram.lesson_list.length && detaiProgram.lesson_list.map((lesson, index) => (
                      <div>
                        <div className='new_content_lession_rogram_category'>
                          <div className='left_new_lession'>
                            <div className='index_new_lession'>
                              #{lesson.indexInProgram}
                            </div>
                            <div className='name_new_lession'>
                              <p>{lesson.nameLesson}</p>
                            </div>
                          </div>

                          <div className='action_new_lession' onClick={() => handleMoreDescript(index)}>
                            {exspand.get(index) ? <ExpandLessIcon className='edit_new_lesstion' /> : <ExpandMoreIcon className='edit_new_lesstion' />}
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
                      <p>Hoạt động</p>
                    </div>
                  </div>
                  <div className='action_new_lession'>
                    <EditIcon className='edit_new_lesstion' />
                    <DeleteIcon className='delete_new_lesstion' />
                  </div>
                </div>
                <div className='content_array_lesson_program_category'>
                  {
                    detaiProgram.task_list && exspand && detaiProgram.task_list.length && detaiProgram.task_list.map((task, index) => (
                      <div>
                        <div className='new_content_lession_rogram_category'>
                          <div className='left_new_lession'>
                            <div className='index_new_lession'>
                              #{index + 1}
                            </div>
                            <div className='name_new_lession'>
                              <p>{task.nameTask}</p>
                            </div>
                          </div>

                          <div className='action_new_lession' onClick={() => handleMoreDescriptTask(index, task)}>
                            {exspandTask.get(index) ? <ExpandLessIcon className='edit_new_lesstion' /> : <ExpandMoreIcon className='edit_new_lesstion' />}
                          </div>

                        </div>
                        <div className='descript_lession_task' style={{ display: exspandTask.get(index) === true ? "block" : "none", cursor: "pointer" }} >
                          <div className='detail_info_over detail_infor_task'>
                            <div className='detail_top detail_top_task'>
                              <div className="detail_top-left">
                                <div className='label_name_program_category'>
                                  Tên lớp hoạt động:
                                </div>
                                <div className="label_name_program_category"> {task.nameTask}</div>
                              </div>
                              <div className="detail_top-right">
                                <div className='label_name_program_category'>
                                  Thời lượng hoạt động:
                                </div>
                                <div className="label_name_program_category"> {task.timeDuration} </div>
                              </div>
                            </div>
                            <div className='detail_bottom detail_bottom_task'>
                              <div className="detail_bottom-left">
                                <div className='label_name_program_category'>
                                  Số lượng nhóm:
                                </div>
                                <div className="label_name_program_category">{task.listGroup && task.listGroup.length ? task.listGroup.length : "0"}</div>
                              </div>
                              <div className="detail_bottom-right_task">
                                <div className='label_name_program_category'>
                                  Yêu cầu hoàn thành:
                                </div>
                                <div className="label_name_program_category">{task.status ? "Bắt buộc" : "Không bắt buộc"} </div>
                              </div>
                            </div>
                            <div className='descipt_task'>
                              <div className='name_descript_task'>Nội dung hoạt động:</div>
                              <div className='cont_descipt_task'></div>
                            </div>
                            <div className='array_list_team_task'>
                              <div className='name_descript_task'>Danh sách nhóm:</div>
                              <div className='search_task'>

                                <TextField
                                  name="nameNewLession"
                                  variant="outlined"
                                  fullWidth
                                  className='search_task_inut'
                                  placeholder='Nhập tên hoạt động'
                                />

                                <div >
                                  <Button className='submit_search_task' variant="contained" startIcon={<SearchIcon />}>
                                    Tìm kiếm
                                  </Button>
                                </div>
                              </div>
                              <div className='action_task_program_class'>
                                <div className='action_divide_group'>
                                  <div>Kiểu chia nhóm:</div>
                                  <div className='form_control_status'>
                                    <FormControl variant="outlined" fullWidth  >

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="bloodGroup"
                                        fullWidth
                                        value={task.typeGroupStudent.toString()}

                                      >
                                        <MenuItem value="1">Tự động chia nhóm </MenuItem>

                                      </Select>
                                    </FormControl>
                                  </div>
                                </div>
                                <div className='action_divide_group'>
                                  <div>Số lượng nhóm:</div>

                                  <div className='input_amount_group'>

                                    <TextField
                                      name="nameNewLession"
                                      variant="outlined"
                                      className='action_divide_group_input'
                                      placeholder='Nhập số lượng nhóm'
                                      type="number"
                                      value={numberGroup.get(index) ? numberGroup.get(index) : ""}
                                      onChange={(e) => changeNumberGroup(index, e.target.value)}
                                    />

                                  </div>
                                  <div >
                                    <Button onClick={() => hancleDivideGroup(task, index)} className='submit_search_task' variant="contained" startIcon={<KeyboardReturnIcon />}>
                                      Chia nhóm
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
                                            <TableCell>Chi tiết </TableCell>
                                            <TableCell align="right">Tên nhóm </TableCell>
                                            <TableCell align="right">Nội dung hoạt động</TableCell>
                                            <TableCell align="right">Trạng thái </TableCell>
                                            <TableCell align="right">Đánh giá </TableCell>
                                            <TableCell align="right">Thao tác </TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {task.listGroup.map((group) => (
                                            // <TableRow
                                            //   key={row.name}
                                            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            // >
                                            //   <TableCell  onClick={() => setOpen(!open)} align="left" style={{ paddingRight: "30px" }}><SettingsIcon style={{ cursor: "pointer" }} className="iconSetting" /></TableCell>
                                            //   <TableCell align="center">{row.name_task_group}</TableCell>
                                            //   <TableCell align="center">{row.content ? row.content : "-"}</TableCell>
                                            //   <TableCell align="center">{row.status ? "Họat động" : "Không hoạt động"}</TableCell>
                                            //   <TableCell align="center">{row.level ? row.level : "-"}</TableCell>
                                            //   <TableCell align="center" style={{ paddingRight: "30px" }}><SettingsIcon style={{ cursor: "pointer" }} className="iconSetting" /></TableCell>
                                            // </TableRow>
                                            <Row key={group.task_group_id} row={group} />
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