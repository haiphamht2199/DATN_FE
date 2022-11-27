import React, { useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BarChartIcon from '@mui/icons-material/BarChart';
import FeedIcon from '@mui/icons-material/Feed';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LayersIcon from '@mui/icons-material/Layers';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
function InfomationClass() {
 const [toggleState, setToggleState] = useState(1);
 const toggleTab = (index) => {
  setToggleState(index);
 };
 return (
  <div className='detail_info_class'>
   <div className='infomation_overview_class'>
    <div className='text_label'>
     <div className='icon_info_div'>
      <InfoIcon className='icon_info' />
     </div>
     <div className='label'>Thông tin chung lớp học</div>
    </div>
    <div className='detail_info_over'>
     <div className='detail_top'>
      <div className="detail_top-left">
       <div className='label_name_class'>
        Tên lớp học:
       </div>
       <div className="name_class_info"> Lớp Học Thực Tại Tăng Cường</div>
      </div>
      <div className="detail_top-right">
       <div className='label_status_class'>
        Trạng thái:
       </div>
       <div className="status_class_info"> Công khai </div>
      </div>
     </div>
     <div className='detail_bottom'>
      <div className="detail_bottom-left">
       <div className='label_date_class'>
        Thời gian hoạt động:
       </div>
       <div className="date_class_info"> 29/10/2022- 20/12/2022</div>
      </div>
      <div className="detail_bottom-right">
       <div className='level_status_class'>
        Trình độ:
       </div>
       <div className="level_class_info"> Cơ bản </div>
      </div>
     </div>
    </div>
   </div>
   <div className='infomation_detail_class_content'>
    <div className='infomation_detail_class_header'>
     <div className='infomation_detail_class_header-left'>
      <div >
       <FormatListBulletedIcon className='icon_header_left' />
      </div>
      <div className='text_header_left'>
       Thông tin chi tiết lớp học
      </div>
     </div>
     <div className='infomation_detail_class_header-right'>
      <Button variant="outlined" endIcon={<ArrowDropDownIcon />}>
       Thao tác
      </Button>
     </div>
    </div>
    <div className='infomation_detail_class_content-main'>
     <div className='infomation_detail_class_content-main-left'>
      <div className="bloc-tabs">
       <button
        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
        onClick={() => toggleTab(1)}
       >
        Mô tả môn học
       </button>
       <button
        className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
        onClick={() => toggleTab(2)}
       >
        Chương trình giảng dạy
       </button>
       <button
        className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
        onClick={() => toggleTab(3)}
       >
        Thi và kiểm tra
       </button>
       <button
        className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
        onClick={() => toggleTab(4)}
       >
        Trao đổi
       </button>
      </div>
      {
       toggleState === 1 &&
       <div style={{ width: "100%", height: "auto" }}>
        <div className='image_class_info_detail'>
         <img src='https://masterstudy.stylemixthemes.com/white-lms/wp-content/uploads/sites/7/2022/01/photo-1491897554428-130a60dd4757-scaled.jpeg?r=54' alt='image_class' />
        </div>
        <div className='content_br'>

        </div>
        <div className='study_document'>
         <div className='iconAndName_study_document'>
          <div className='icon_Stydy_document'>
           <FeedIcon className='icon_document' />
          </div>
          <div className='name_document'>
           Học liệu tăng cường.zip
          </div>
         </div>
         <div className='downt_document'>
          <VerticalAlignBottomIcon className='down_load_icon' />
         </div>
        </div>
        <div className='study_document'>
         <div className='iconAndName_study_document'>
          <div className='icon_Stydy_document'>
           <FeedIcon className='icon_document' />
          </div>
          <div className='name_document'>
           Học liệu tăng cường.zip
          </div>
         </div>
         <div className='downt_document'>
          <VerticalAlignBottomIcon className='down_load_icon' />
         </div>
        </div>
        <div className='descript_class_detail_info'>

        </div>
       </div>
      }
      {
       toggleState === 2 &&
       <div className='listProgramStudy'>
        <div className='informationProgramStudy'>
         <div className='titleProgramStudy'>
          <span className='titleProgram'>Lession 1:</span> Introduction to MasterStudy AR-VR
         </div>
         <div className='listLessionAndActive'>
          <div className='inforLessionAndActive'>
           <div className='iconAndTitlelessionAndActive'>
            <div>
             <FeedIcon className='icon_paper' />
            </div>
            <div className="Index_Lession">#1</div>
            <div style={{ fontWeight: "600" }}>Introduction AR-VR</div>
           </div>
           <div className='amountDateLession'>
            <AddAlarmIcon className='icon_oclock' />
            <span>1 giờ</span>
           </div>
          </div>
          <div className='inforLessionAndActive'>
           <div className='iconAndTitlelessionAndActive'>
            <div >
             <LayersIcon className='icon_active_student' />
            </div>
            <div className="Index_Lession">#2</div>
            <div style={{ fontWeight: "600" }}>How to use tools glass VR-AR in game run strangers.</div>
           </div>
           <div className='amountDateLession'>
            <AddAlarmIcon className='icon_oclock' />
            <span>0.5 giờ</span>
           </div>
          </div>
         </div>
        </div>
       </div>
      }

     </div>
     <div className='infomation_detail_class_content-main-right'>
      <div className='analysis_class_top'>
       <div >
        <BarChartIcon className='icon_analysis' />
       </div>
       <div className='text_analysis'>
        Thống kê lớp học
       </div>
      </div>
      <div className='analysis_class'>
       <div className='iconAndLabel_analysis'>
        <div>
         <FeedIcon className='icon_paper' />
        </div>
        <div className='label_analysis'>
         Tổng số bài giảng:
        </div>
       </div>
       <div className='content_analysis'>
        27 bài giảng
       </div>
      </div>
      <div className='analysis_class'>
       <div className='iconAndLabel_analysis'>
        <div>
         <LayersIcon className='icon_active_student' />
        </div>
        <div className='label_analysis'>
         Tổng số hoạt động:
        </div>
       </div>
       <div className='content_analysis'>
        10 hoạt động
       </div>
      </div>
      <div className='analysis_class'>
       <div className='iconAndLabel_analysis'>
        <div>
         <AddAlarmIcon className='icon_oclock' />
        </div>
        <div className='label_analysis'>
         Thời lượng học tập:
        </div>
       </div>
       <div className='content_analysis'>
        20 giờ
       </div>
      </div>
      <div className='analysis_class'>
       <div className='iconAndLabel_analysis'>
        <div>
         <Diversity3Icon className='icon_amount_student' />
        </div>
        <div className='label_analysis'>
         Tổng số sinh viên:
        </div>
       </div>
       <div className='content_analysis'>
        112 sinh viên
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default InfomationClass