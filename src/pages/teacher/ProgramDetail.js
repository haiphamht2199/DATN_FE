import React, { useState, useEffect, useCallback } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import PropTypes from 'prop-types';
import FeedIcon from '@mui/icons-material/Feed';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import SpeedIcon from '@mui/icons-material/Speed';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import LayersIcon from '@mui/icons-material/Layers';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../helper/axios'
import axiosImage from '../../helper/axiosImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import user from '../../redux/reducer/user';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Post from '../../component/comment/Post';
function ProgramDetail() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLesson, setIsLesson] = useState(false);
  const [contentLesson, setContentLesson] = useState(false);
  const [contentTask, setContentTask] = useState("");
  const [isTask, setIsTask] = useState(false);
  const student = useSelector(state => state.user.student)
  let arrayProgram = useSelector(state => state._class.classDetail.arrayProgram);
  const classDetail = useSelector(state => state._class.classDetail);
  const [listComments, setListComments] = useState([]);
  const [backendComments, setBackendComments] = useState([]);
  const [program, setProgram] = useState("");
  const program_id = searchParams.get("program_category_id");
  const [loading, setLoading] = React.useState(false);
  const [dataPost, setDataPost] = useState({});
  const [idTraceLesson, setIdTraceLesson] = useState("");
  const [idTraceTask, setIdTraceTask] = useState("");
  const [activeComment, setActiveComment] = useState(null);
  const [type, setType] = useState(1);
  function handleClick() {
    setLoading(true);
  }
  useEffect(() => {
    if (program_id && arrayProgram.length) {
      arrayProgram.forEach(element => {

        if (element.program_category_id === parseInt(program_id)) {

          setProgram(element);
          return;
        }
      });

    }
  }, [program_id]);
  const handleDetailLesson = useCallback(async (item, index, _type) => {
    setType(_type);
    let datarReq = {
      commentId: null,
      objectId: item.id_lesson,
      type: _type,
      level: 0
    }
    try {
      let dataComment = [];
      let listCommentsRes = await axios.post('/comments/get_comments', datarReq);
      if (listCommentsRes.data.code === 200) {
        let dataRes = listCommentsRes.data.data;
        if (dataRes) {
          dataRes.data && dataRes.data.length && dataRes.data.forEach(item => {
            item.level = dataRes.level;
            item.class_id = parseInt(dataRes.class_id);
            item.objectId = datarReq.objectId;
            item.type = _type;
            item.count = dataRes.count;
            dataComment.push(item);
          });
        }
      }
      setBackendComments(dataComment);
      let dataPostRes = {}
      dataPostRes.level = 0;
      dataPostRes.class_id = searchParams.get("class_id");
      dataPostRes.objectId = item.id_lesson;
      setDataPost(dataPostRes)
    } catch (error) {
      console.log("e:", error)
    }
    if (idTraceLesson) {
      let traceRes = await axios.put(`/student/traces?id_trace=${idTraceLesson}`);
      if (traceRes.data.code === 200) {
        setIdTraceLesson("")
      }
    } else {
      let traceRes = await axios.post('/student/traces', {
        id_trace_student: null,
        object_id: item.id_lesson,
        type: 1,
        content: item.name_lesson,
        class_id: searchParams.get("class_id")
      });
      if (traceRes.data.code === 200) {
        setIdTraceLesson(traceRes.data.data.id_trace_student)
      }
    }
    dispatch({
      type: 'SHOW_LOADING_START'
    });
    setTimeout(() => {
      dispatch({
        type: 'SHOW_LOADING_END'
      });
      setIsLesson(true);
      setIsTask(false);
      setContentLesson(item);
    }, 500)
    let data = document.querySelectorAll(".content_list_lesson_class_left");
    if (data.length) {
      revoveClassList(data, index)
      data[index].classList.add("customize")
    }
  }, [isLesson, contentLesson, isTask, setIsLesson, setIsTask, setContentLesson, idTraceLesson, type, dataPost, setBackendComments]);
  const revoveClassList = (data, index) => {
    for (let i = 0; i < data.length; i++) {
      if (i !== index) {
        data[i].classList.remove("customize")
      }
    }
  }
  const handleDetailTask = useCallback(async (item, index, _type) => {
    setType(2);
    let datarReq = {
      commentId: null,
      objectId: item.id_task,
      type: _type,
      level: 0
    }
    try {
      let dataComment = [];
      let listCommentsRes = await axios.post('/comments/get_comments', datarReq);
      if (listCommentsRes.data.code === 200) {
        let dataRes = listCommentsRes.data.data;
        if (dataRes) {
          dataRes.data && dataRes.data.length && dataRes.data.forEach(item => {
            item.level = dataRes.level;
            item.class_id = parseInt(dataRes.class_id);
            item.objectId = datarReq.objectId;
            item.type = _type;
            item.count = dataRes.count;
            dataComment.push(item);
          });
        }
      }
      if (idTraceTask) {
        let traceRes = await axios.put(`/student/traces?id_trace=${idTraceTask}`);
        if (traceRes.data.code === 200) {
          setIdTraceTask("")
        }
      } else {
        let traceRes = await axios.post('/student/traces', {
          id_trace_student: null,
          object_id: item.id_task,
          type: 2,
          content: item.name_task,
          class_id: searchParams.get("class_id")
        });
        if (traceRes.data.code === 200) {
          setIdTraceTask(traceRes.data.data.id_trace_student)
        }
      }
      setBackendComments(dataComment);

    } catch (error) {
      console.log("e:", error)
    }
    setActiveComment(true)
    dispatch({
      type: 'SHOW_LOADING_START'
    });
    setIsLesson(false);
    if (student === "STUDENT") {
      if (item.id_task) {
        let listStudentRes = await axios.get(`/student/classes/list_program_categories/task/details?task_id=${item.id_task}`);
        if (listStudentRes.data.code === 200) {
          setTimeout(() => {
            dispatch({
              type: 'SHOW_LOADING_END'
            });
            setIsTask(true);
            setContentTask(listStudentRes.data.data);
          }, 500)
        }
      }
    } else {
      setTimeout(() => {
        dispatch({
          type: 'SHOW_LOADING_END'
        });
        setIsTask(true);
        setContentTask(item);
      }, 500)
    }
    let dataPostRes = {}
    dataPostRes.level = 0;
    dataPostRes.class_id = searchParams.get("class_id");
    dataPostRes.objectId = item.id_task;
    setDataPost(dataPostRes)
    let data = document.querySelectorAll(".content_list_lesson_class_left");
    if (data.length) {
      revoveClassList(data, index)
      data[index].classList.add("customize")
      // revoveClassList(data, index)
      // data[index].classList.add("customize");
    }
  }, [isLesson, contentTask, isTask, setBackendComments, dataPost, activeComment, setActiveComment, type])
  const uploadHandler = async (event, task_groups_id) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      let dataRes = await axiosImage.post(`/student/classes/assign_task?task_groups_id=${task_groups_id}`, formData);
      if (dataRes.data.code === 200) {
        toast.success("Nộp bài tập thành công!", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (error) {
      toast.error("Nộp bài tập thất bại!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }
  useEffect(() => {
    if (contentTask && contentTask.students && contentTask.students.length) {
      contentTask.students.forEach(student => {
        if (document.querySelector(`.evaluate${student.code_student}`)) {
          document.querySelector(`.evaluate${student.code_student}`).innerHTML = student.evaluate
        }
      })
    }
  }, [contentTask]);
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contentTask.students.length) : 0;

  return (
    <>
      <ToastContainer />
      {
        program && <div className='detail_class'>
          <div className='url_lession_top'>
            <div >
              <AddToPhotosIcon className='icon_lession' />
            </div>
            <div className='url_lession_detail'>
              <div className='content_url'>Danh sách lớp / {classDetail.name_class} / Chi tiết lớp học / Chương trình giảng day</div>
            </div>
          </div>
          <div className='detail_info_class'>
            <div className='infomation_detail_program_content'>
              <div className='list_lesson_left'>
                <div className="content_lesson_lest">
                  <div className='list_lesson_left-top'>Danh sách bài học</div>
                  <div className='list_lession_content-left'>

                    <div className='header_lesson_name_class_top'>
                      <div className='name_lession'>Lession {program.index_program}: {program.name_program_category}</div>
                      <div className='icon_arround_lessson'>
                        <ArrowDropDownIcon />
                      </div>
                    </div>
                    <div className={"list_content_custom"}>
                      {
                        program.lessons && program.lessons.length && program.lessons[0].id_lesson && program.lessons.map((item, indexLess) => (
                          <div className='content_list_lesson_class_left' onClick={() => handleDetailLesson(item, indexLess, 1)}>
                            <div className='iconAndLabel_name_class'>
                              <div>
                                <FeedIcon className='icon_paper_custom' />
                              </div>
                              <div className='index_name_lesson'>
                                # {indexLess + 1}
                              </div>
                            </div>
                            <div className='content_analysis' style={{ width: "78%" }}>
                              {item.name_lesson}
                            </div>
                          </div>
                        ))
                      }
                      {
                        program.tasks && program.tasks.length && program.tasks[0].id_task && program.tasks.map(((item, index) => (
                          <div className='content_list_lesson_class_left' onClick={() => handleDetailTask(item, index + program.lessons.length, 2)}>
                            <div className='iconAndLabel_name_class'>
                              <div>
                                <LayersIcon className='icon_paper_custom' />
                              </div>
                              <div className='index_name_lesson'>
                                # {index + 1}
                              </div>
                            </div>
                            <div className='content_analysis' style={{ width: "78%" }}>
                              {item.name_task}
                            </div>
                          </div>
                        )))
                      }
                    </div>
                  </div>
                </div>
              </div>

              {contentLesson && isLesson &&
                <div className='customizeTest'>
                  <div className='detail_lesson_right' dangerouslySetInnerHTML={{ __html: contentLesson?.description_lesson }}>

                  </div>

                  {contentLesson && isLesson && <div className='system_comment'>


                    <Post
                      listComments={listComments}
                      setListComments={setListComments}
                      dataPost={dataPost}
                      backendComments={backendComments}
                      setBackendComments={setBackendComments}
                      activeComment={activeComment}
                      setActiveComment={setActiveComment}
                      type={type}
                    />
                  </div>
                  }
                </div>
              }
              {
                contentTask && isTask && <div className='detail_Task_right' >
                  <div className='name_content_task'>
                    <p style={{ fontSize: "22px" }}>Active 1 : {contentTask.name_task ? contentTask.name_task : ""}</p>


                  </div>
                  {
                    student === "STUDENT" && <div className='descript_task_lesson' style={{ display: "flex" }}>
                      <p className='descript_task_master' dangerouslySetInnerHTML={{ __html: contentTask?.content_task }}></p>
                    </div>
                  }
                  {
                    student === "ADMIN" && <div className='descript_task_lesson' style={{ display: "flex" }}>
                      <p className='descript_task_master' dangerouslySetInnerHTML={{ __html: contentTask?.description_task }}></p>
                    </div>
                  }
                  {
                    student === "STUDENT" &&
                    <div className='header_lesson_name_class_top' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", marginTop: "30px" }}>
                      <div className='name_lession_task'>Thông tin hoạt động nhóm</div>
                      {
                        student === "STUDENT" && contentTask.student_groups && contentTask.student_groups && !contentTask.student_groups.path_file
                        && <div className='icon_arround_lessson'>
                          <Button variant="outlined" className='icon_arround_lessson_btn' component="label" startIcon={<CloudUploadIcon />}>
                            Nộp bài
                            <input hidden multiple type="file" onChange={(e) => uploadHandler(e, contentTask.student_groups.task_student_id)} />
                          </Button>
                        </div>
                      }
                    </div>
                  }
                  {
                    student === "STUDENT" &&
                    <div className='list_content_custom_task'>
                      <div>
                        <span className='is_complete_task_require'>Tên nhóm:</span>
                        <span>{contentTask.student_groups && contentTask.student_groups.name_student_groups && contentTask.student_groups.name_student_groups}</span>
                      </div>
                      <div className='descript_task_lesson_task' style={{ display: "flex" }}>
                        <span style={{
                          width: "27%"
                        }}>Miêu tả hoạt động :</span>
                        <p className='descript_task_master' dangerouslySetInnerHTML={{ __html: contentTask.student_groups && contentTask.student_groups.content }}></p>
                      </div>
                      <div className='is_time_complete_task_require'>
                        <div>
                          <span className='is_complete_task_require'>Yêu cầu hoàn thành:</span>
                          <span>{contentTask.is_require === 0 ? "không bắt buộc" : "Bắt buộc"}</span>
                        </div>
                        <div className="time_complete_task_require">
                          <span className='is_complete_task_require'>Thời hạn hoàn thành:</span>
                          <span>{contentTask.date_time_finished_task}</span>
                        </div>
                      </div>
                      {
                        contentTask.student_groups && <div className='is_time_complete_task_require'>
                          <div>
                            <span className='is_complete_task_require'>Tình trạng hoạt động:</span>
                            <span className={contentTask.student_groups !== "" && contentTask.student_groups && contentTask.student_groups.path_file && contentTask.student_groups.path_file ? "doneTask" : "notDoneTask"}>{contentTask.student_groups && contentTask.student_groups.path_file && contentTask.student_groups.path_file !== -1 ? "Đã nộp bài" : "Chưa nộp bài"}</span>
                          </div>
                          <div className="time_complete_task_require">
                            <span className='is_complete_task_require'>Thời gian hoàn thành:</span>
                            <span>{contentTask.student_groups && contentTask.student_groups.time_assign}</span>
                          </div>
                        </div>
                      }
                      {
                        contentTask.student_groups && <div style={{ marginTop: "10px" }}>
                          <span className='is_complete_task_require' >File nộp bài:</span>
                          <span>{contentTask.student_groups && contentTask.student_groups.path_file && contentTask.student_groups.path_file && contentTask.student_groups.path_file.slice(16, 50)}</span>
                          <span style={{ marginLeft: "5px" }}>
                            {
                              student === "STUDENT" && contentTask.student_groups && contentTask.student_groups.path_file
                              &&
                              <Link to={require(`../../resource/${contentTask.student_groups.path_file.replaceAll('\\', '/')}`)} target="_blank" download>
                                <VerticalAlignBottomIcon className='down_load_icon1' />
                              </Link>

                            }
                          </span>
                        </div>
                      }

                      {
                        contentTask.student_groups && contentTask.student_groups.content_evaluate &&
                        <div style={{ marginTop: "10px" }}>Đánh giá hoạt động:</div>
                      }
                      {
                        contentTask.student_groups && contentTask.student_groups.content_evaluate &&
                        <div className='nhap_noi_dung_kt' >
                          <TextareaAutosize
                            value={contentTask.student_groups.content_evaluate}

                            contenteditable='true'
                            placeholder="Nhập nội dung câu hỏi tại đây"
                            style={{ width: 680, height: 70, border: "1px solid rgb(233, 226, 226)" }}
                          />
                        </div>

                      }

                      {
                        contentTask.students && contentTask.students.length ?
                          <div className='list_student_class_by_group'>
                            <div className='title_list_student_class_by_group'>Danh sách thành viên nhóm</div>
                            <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 600 }} aria-label="custom pagination table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="center">Họ và tên </TableCell>
                                    <TableCell align="center">Mã số sinh viên  </TableCell>
                                    <TableCell align="center">Gmail</TableCell>
                                    <TableCell align="center">Điểm</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {(rowsPerPage > 0
                                    ? contentTask.students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : contentTask.students
                                  ).map((row) => (
                                    <TableRow key={row.code_student} className={row.is_captain === 1 ? "is_captain" : ""}>
                                      <TableCell style={{ width: 200 }} align="center">
                                        {row.name_student}
                                      </TableCell>
                                      <TableCell style={{ width: 200 }} align="center">
                                        {row.code_student}
                                      </TableCell>
                                      <TableCell style={{ width: 200 }} align="center">
                                        <TableCell align="center">{row.email}</TableCell>
                                      </TableCell>
                                      <TableCell align="center">{row.scope ? row.scope : "--"}</TableCell>
                                    </TableRow>
                                  ))}

                                  {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                      <TableCell colSpan={6} />
                                    </TableRow>
                                  )}
                                </TableBody>
                                <TableFooter>
                                  <TableRow>
                                    <TablePagination
                                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                      colSpan={3}
                                      count={contentTask.students.length}
                                      rowsPerPage={rowsPerPage}
                                      page={page}
                                      SelectProps={{
                                        inputProps: {
                                          'aria-label': 'rows per page',
                                        },
                                        native: true,
                                      }}
                                      onPageChange={handleChangePage}
                                      onRowsPerPageChange={handleChangeRowsPerPage}
                                      ActionsComponent={TablePaginationActions}
                                    />
                                  </TableRow>
                                </TableFooter>
                              </Table>
                            </TableContainer>

                          </div> : ""
                      }

                    </div>

                  }
                  <div className='system_comment'>


                    <Post
                      listComments={listComments}
                      setListComments={setListComments}
                      dataPost={dataPost}
                      backendComments={backendComments}
                      setBackendComments={setBackendComments}
                      activeComment={activeComment}
                      setActiveComment={setActiveComment}
                      type={type}
                    />
                  </div>



                </div>
              }

            </div>
          </div>
        </div>
      }

    </>
  )
}

export default ProgramDetail