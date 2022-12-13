import React, { useState, useEffect } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BarChartIcon from '@mui/icons-material/BarChart';
import FeedIcon from '@mui/icons-material/Feed';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LayersIcon from '@mui/icons-material/Layers';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
function ProgramDetail() {
 return (
  <>
   <div className='detail_class'>
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
          <div className='name_lession'>Lession 1: Introduction to MasterStudy VR-AR</div>
          <div className='icon_arround_lessson'>

          </div>
         </div>
         <div className='list_content_custom'>
          <div className='content_list_lesson_class_left'>
           <div className='iconAndLabel_name_class'>
            <div>
             <FeedIcon className='icon_paper_custom' />
            </div>
            <div className='index_name_lesson'>
             # 1
            </div>
           </div>
           <div className='content_analysis' style={{ width: "78%" }}>
            Introduction VR-AR
           </div>
          </div>
          <div className='content_list_lesson_class_left'>
           <div className='iconAndLabel_name_class'>
            <div>
             <LayersIcon className='icon_paper_custom' />
            </div>
            <div className='index_name_lesson'>
             # 2
            </div>
           </div>
           <div className='content_analysis' style={{ width: "78%" }}>
            How to use tool glass VR-AR in game run strangers
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
      <div className='detail_lesson_right'>

      </div>
     </div>
    </div>
   </div>
  </>
 )
}

export default ProgramDetail