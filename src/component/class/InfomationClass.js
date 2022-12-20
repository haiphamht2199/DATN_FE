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
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function InfomationClass(props) {
 const { detailClass } = props
 const [toggleState, setToggleState] = useState(1);
 const student = useSelector(state => state.user.student)
 const toggleTab = (index) => {
  setToggleState(index);
 };
 return (
  <div className='detail_info_class'>
   {
    !student && <div className='infomation_overview_class'>
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
        <div className="name_class_info"> {detailClass.name_class}</div>
       </div>
       <div className="detail_top-right">
        <div className='label_status_class'>
         Trạng thái:
        </div>
        <div className="status_class_info">{detailClass.status_class === 1 ? "Công khai" : "Không công khai"} </div>
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
   }

   <div className='infomation_detail_class_content'>
    {
     !student && <div className='infomation_detail_class_header'>
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
    }

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
         <img src={require(`../../resource/${detailClass.path_file_image}`)} alt='image_class' />
        </div>
        <div className='content_br'>

        </div>
        {
         detailClass.documentList && detailClass.documentList.length && detailClass.documentList.map(item => (
          <div className='study_document'>
           <div className='iconAndName_study_document'>
            <div className='icon_Stydy_document'>
             <FeedIcon className='icon_document' />
            </div>
            <div className='name_document'>
             <div className='name_document'>
              {item.name_document}
             </div>
            </div>
           </div>
           <div className='downt_document'>
            <Link to={require(`../../resource/${item.file_path_document.replaceAll('\\', '/')}`)} target="_blank" download>
             <VerticalAlignBottomIcon className='down_load_icon' />
            </Link>

           </div>
          </div>
         ))
        }
        <div className='descript_class_detail_info'>

        </div>
       </div>
      }
      {
       toggleState === 2 &&
       <div className='listProgramStudy'>
        {
         detailClass.arrayProgram && detailClass.arrayProgram.length && detailClass.arrayProgram.map(pr => (
          <div className='informationProgramStudy'>
           <Link to={`/bai-hoc/chi-tiet-lop-hoc/chuong-trinh-hoc?class_id=${detailClass.class_id}&program_category_id=${pr.program_category_id}`}> <div className='titleProgramStudy'>
            <span className='titleProgram'>Lession {pr.index_program}:</span>{pr.name_program_category}
           </div></Link>
           <div className='listLessionAndActive'>
            {
             pr.lessons && pr.lessons.length && pr.lessons[0].id_lesson && pr.lessons.map((less, indexLess) => (
              <div className='inforLessionAndActive'>
               <div className='iconAndTitlelessionAndActive'>
                <div>
                 <FeedIcon className='icon_paper' />
                </div>
                <div className="Index_Lession">#{indexLess + 1}</div>
                <div style={{ fontWeight: "600" }}>{less.name_lesson}</div>
               </div>
               <div className='amountDateLession'>
                <AddAlarmIcon className='icon_oclock' />
                <span>{less.time_duration} giờ</span>
               </div>
              </div>
             ))
            }
            {
             pr.tasks && pr.tasks.length && pr.tasks[0].id_task && pr.tasks.map((task, indexTask) => (
              <div className='inforLessionAndActive'>
               <div className='iconAndTitlelessionAndActive'>
                <div >
                 <LayersIcon className='icon_active_student' />
                </div>
                <div className="Index_Lession">#{indexTask + 1}</div>
                <div style={{ fontWeight: "600" }}>{task.name_task}</div>
               </div>
               <div className='amountDateLession'>
                <AddAlarmIcon className='icon_oclock' />
                <span>{task.time_duration_task} giờ</span>
               </div>
              </div>
             ))
            }

           </div>
          </div>
         ))
        }
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