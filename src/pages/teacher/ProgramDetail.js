import React, { useState, useEffect, useCallback } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import FeedIcon from '@mui/icons-material/Feed';
import Button from '@mui/material/Button';
import LayersIcon from '@mui/icons-material/Layers';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../helper/axios'
import axiosImage from '../../helper/axiosImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import user from '../../redux/reducer/user';
function ProgramDetail() {
 const dispatch = useDispatch();
 const [searchParams, setSearchParams] = useSearchParams();
 const [isLesson, setIsLesson] = useState(false);
 const [contentLesson, setContentLesson] = useState("");
 const [contentTask, setContentTask] = useState("");
 const [isTask, setIsTask] = useState(false);
 const student = useSelector(state => state.user.student)
 let arrayProgram = useSelector(state => state._class.classDetail.arrayProgram);
 const classDetail = useSelector(state => state._class.classDetail)
 console.log("contentTask:", contentTask)
 console.log("contentLesson:", contentLesson);
 const [program, setProgram] = useState("");
 const program_id = searchParams.get("program_category_id");
 const [loading, setLoading] = React.useState(false);
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
 useEffect(() => {
  let div_class = document.querySelector('.detail_lesson_right');
  if (div_class) {
   div_class.innerHTML = contentLesson.description_lesson
  }
  if (student === "STUDENT") {
   if (document.querySelector('.descript_task_master')) {
    document.querySelector('.descript_task_master').innerHTML = contentTask.content_task
   }
  } else {
   if (document.querySelector('.descript_task_master')) {
    document.querySelector('.descript_task_master').innerHTML = contentTask.description_task
   }
  }

 }, [contentLesson, isLesson, contentTask, user])
 const handleDetailLesson = useCallback((item) => {
  setIsLesson(true);
  setIsTask(false);
  setContentLesson(item);
 }, [isLesson, contentLesson, isTask, setIsLesson, setIsTask, setContentLesson]);
 const revoveClassList = (data, index) => {
  for (let i = 0; i < data.length; i++) {
   if (i !== index) {
    data[i].classList.remove("customize")
   }
  }
 }
 useEffect(() => {
  let data = document.querySelectorAll(".content_list_lesson_class_left");
  if (data.length) {
   for (let i = 0; i < data.length; i++) {
    data[i].addEventListener("click", () => {
     revoveClassList(data, i)
     data[i].classList.add("customize");
    })
   }
   // revoveClassList(data, index)
   // data[index].classList.add("customize");
  }
 }, [isLesson, isTask])
 const handleDetailTask = useCallback(async (item, index) => {
  setIsLesson(false);
  if (student === "STUDENT") {
   if (item.id_task) {
    let listStudentRes = await axios.get(`/student/classes/list_program_categories/task/details?task_id=${item.id_task}`);
    if (listStudentRes.data.code === 200) {
     setIsTask(true);
     setContentTask(listStudentRes.data.data);
    }
   }
  } else {
   setIsTask(true);
   setContentTask(item);
  }


 }, [isLesson, contentTask, isTask])
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
 }, [contentTask])
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
       <div className='content_url'>Danh sách lớp /{classDetail.name_class}/Chi tiết lớp học/Chương trình giảng day</div>
      </div>
     </div>
     <div className='detail_info_class'>
      <div className='infomation_detail_program_content'>
       <div className='list_lesson_left'>
        <div className='content_lesson_lest'>
         <div className='list_lesson_left-top'>Danh sách bài học</div>
         <div className='list_lession_content-left'>

          <div className='header_lesson_name_class_top'>
           <div className='name_lession'>Lession {program.index_program}: {program.name_program_category}</div>
           <div className='icon_arround_lessson'>

           </div>
          </div>
          <div className='list_content_custom'>
           {
            program.lessons && program.lessons.length && program.lessons[0].id_lesson && program.lessons.map((item, indexLess) => (
             <div className='content_list_lesson_class_left' onClick={() => handleDetailLesson(item)}>
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
             <div className='content_list_lesson_class_left' onClick={() => handleDetailTask(item, index)}>
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
       {
        contentLesson && isLesson && <div className='detail_lesson_right' >

        </div>
       }
       {
        contentTask && isTask && <div className='detail_Task_right' >
         <div className='name_content_task'>
          <h2>{contentTask.name_task}</h2>
          {
           student && contentTask.id_task_student_groups && <div className='submit_task_student'>
            <Button variant="contained" component="label" endIcon={<SendIcon />} >
             Send
             <input hidden multiple type="file" onChange={(e) => uploadHandler(e, contentTask.id_task_student_groups)} />
            </Button>
           </div>
          }

         </div>
         <div className='descript_task_lesson' style={{ display: "flex" }}>
          <span style={{
           width: "40%"
          }}>Miêu tả hoạt động :</span>
          <p className='descript_task_master'></p>
         </div>
         {
          student && contentTask.id_task_student_groups && <div className='is_time_complete_task_require'>
           <div>
            <span className='is_complete_task_require'>Yêu cầu hoàn thành:</span>
            <span>{contentTask.is_require === 0 ? "không bắt buộc" : "Bắt buộc"}</span>
           </div>
           <div className="time_complete_task_require">
            <span className='is_complete_task_require'>Thời gian hoàn thành:</span>
            <span>20h30,08/11/2022</span>
           </div>
          </div>
         }
         {
          student && contentTask.id_task_student_groups && <div className='status_assign_task'>
           <span className='is_complete_task_require'>Tình trạng hoạt động:</span>
           <span className={contentTask.status_assign === 1 ? "doneTask" : "notDoneTask"}>{contentTask.status_assign === 1 ? "Đã nộp bài" : "Chưa nộp bài"}</span>
          </div>
         }

         {
          student === "STUDENT" && <div className='list_student_class_by_group'>
           <div className='title_list_student_class_by_group'>Danh sách thành viên nhóm</div>
           <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
             <TableHead>
              <TableRow>
               <TableCell>Họ và tên</TableCell>
               <TableCell align="center">MSSV</TableCell>
               <TableCell align="center">Gmail</TableCell>
               <TableCell align="center">Tài liệu</TableCell>
               <TableCell align="center">Thời gian nộp</TableCell>
               <TableCell align="center">Điểm</TableCell>
              </TableRow>
             </TableHead>
             <TableBody>
              {contentTask.students && contentTask.students.length ? contentTask.students.map((row) => (
               <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
               >
                <TableCell component="th" scope="row">
                 {row.name_student}
                </TableCell>
                <TableCell align="right">{row.code_student}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="center">{row.file_assign ? row.file_assign : "--"}</TableCell>
                <TableCell align="center">{row.time_assign ? row.time_assign : "--"}</TableCell>
                <TableCell align="center" className={"evaluate"}>{row.scope ? row.scope : "--"}</TableCell>
               </TableRow>
              )) : ""}
             </TableBody>
            </Table>
           </TableContainer>
          </div>
         }

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