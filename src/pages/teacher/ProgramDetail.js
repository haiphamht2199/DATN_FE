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
function ProgramDetail() {
 const dispatch = useDispatch();
 const [searchParams, setSearchParams] = useSearchParams();
 const [isLesson, setIsLesson] = useState(false);
 const [contentLesson, setContentLesson] = useState("");
 const [isTask, setIsTask] = useState(false);
 let arrayProgram = useSelector(state => state._class.classDetail.arrayProgram);
 console.log("contentLesson:", contentLesson)
 console.log("isLesson:", isLesson);
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
 }, [isLesson, contentLesson, isTask])
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
             <div className='content_list_lesson_class_left'>
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
        contentLesson && <div className='detail_lesson_right' >

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