import React, { useState, useEffect, useCallback } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BarChartIcon from '@mui/icons-material/BarChart';
import FeedIcon from '@mui/icons-material/Feed';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LayersIcon from '@mui/icons-material/Layers';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
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
function ProgramDetail() {
 const dispatch = useDispatch();
 const [searchParams, setSearchParams] = useSearchParams();
 const [isLesson, setIsLesson] = useState(false);
 const [contentLesson, setContentLesson] = useState("");
 const [contentTask, setContentTask] = useState("");
 const [isTask, setIsTask] = useState(false);
 let arrayProgram = useSelector(state => state._class.classDetail.arrayProgram);
 console.log("contentTask:", contentTask)
 console.log("isTask:", isTask);
 const [program, setProgram] = useState("");
 const program_id = searchParams.get("program_category_id");
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
 }, [contentLesson])
 const handleDetailLesson = useCallback((item) => {
  setIsLesson(true);
  setIsTask(false);
  setContentLesson(item);
 }, [isLesson, contentLesson, isTask]);
 const handleDetailTask = useCallback(async (item) => {
  setIsLesson(false);
  if (item.id_task) {
   let listStudentRes = await axios.get(`/student/classes/list_program_categories/task/details?task_id=${item.id_task}`);
   if (listStudentRes.data.code === 200) {
    setIsTask(true);
    setContentTask(listStudentRes.data.data);
   }
  }

 }, [isLesson, contentTask, isTask])
 function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
 }



 const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
 ];
 return (
  <>
   {
    program && <div className='detail_class'>
     <div className='url_lession_top'>
      <div >
       <AddToPhotosIcon className='icon_lession' />
      </div>
      <div className='url_lession_detail'>
       <div className='content_url'>Danh sách lớp / lớp học số 1/Chi tiết lớp học/Chương trình giảng day</div>
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
             <div className='content_list_lesson_class_left' onClick={() => handleDetailTask(item)}>
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
         </div>
         <div className='descript_task_lesson'>
          <span>Miêu tả hoạt động :</span>
          {contentTask.content_task}
         </div>
         <div className='list_student_class_by_group'>
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
               <TableCell align="center">{row.evaluate ? row.evaluate : "--"}</TableCell>
              </TableRow>
             )) : ""}
            </TableBody>
           </Table>
          </TableContainer>
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