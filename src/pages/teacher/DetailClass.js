import React, { useState, useEffect } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import InfomationClass from '../../component/class/InfomationClass';
import InformationListProgramStudy from '../../component/class/InformationListProgramStudy';
import ManagerStudent from '../../component/class/ManagerStudent';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function DetailClass() {
 const dispatch = useDispatch();
 const detailClass = useSelector(state => state._class.classDetail);
 const student = useSelector(state => state.user.student);
 console.log("classDetail:", detailClass);
 console.log("student:", student)
 const [toggleStateAddClass, setToggleStateAddClass] = useState(1);
 const [searchParams, setSearchParams] = useSearchParams();
 const toggleTabAddClass = (index) => {

  setToggleStateAddClass(index);
 }
 useEffect(() => {
  if (student === "STUDENT") {
   dispatch({
    type: 'GET_DETAIL_INFORMATION_CLASS_STUDENT_BY_ID',
    payload: searchParams.get("tag_class")
   })
   dispatch({
    type: 'GET_DETAIL_INFORMATION_PROGRAM_STUDENT_CLASS_BY_ID',
    payload: searchParams.get("class_id")
   })
  } else {
   if (searchParams.get("class_id")) {
    dispatch({
     type: 'GET_DETAIL_INFORMATION_CLASS_BY_ID',
     payload: searchParams.get("class_id")
    })
    dispatch({
     type: 'GET_DETAIL_INFORMATION_AND_DOCUMENT_CLASS_BY_ID',
     payload: searchParams.get("class_id")
    });
    dispatch({
     type: 'GET_DETAIL_INFORMATION_PROGRAM_CLASS_BY_ID',
     payload: searchParams.get("class_id")
    });
    dispatch({
     type: 'GET_DETAIL_INFORMATION_EXAM_CLASS_BY_ID',
     payload: searchParams.get("class_id")
    })
   }
  }

 }, [])
 return (
  <>
   {
    detailClass.class_id && <div className='detail_class'>
     <div className='url_lession_top'>
      <div >
       <AddToPhotosIcon className='icon_lession' />
      </div>
      <div className='url_lession_detail'>
       <div className='content_url'>Danh sách lớp / {detailClass.name_class}</div>
      </div>
     </div>
     <div className='content_detail_class'>
      {
       student === "ADMIN" && <div className="bloc-tabs_detail_class">

        <div
         className={toggleStateAddClass === 1 ? "tabs_detail_class active_tabs_detail_class" : "tabs_detail_class"}
         onClick={() => toggleTabAddClass(1)}
        >
         Thông tin chung
        </div>

        <div
         className={toggleStateAddClass === 2 ? "tabs_detail_class active_tabs_detail_class" : "tabs_detail_class"}
         onClick={() => toggleTabAddClass(2)}
        >
         Chương trình dạy
        </div>
        <div
         className={toggleStateAddClass === 3 ? "tabs_detail_class active_tabs_detail_class" : "tabs_detail_class"}
         onClick={() => toggleTabAddClass(3)}
        >
         Quản lý sinh viên
        </div>
       </div>
      }

      {
       toggleStateAddClass === 1 &&
       <InfomationClass detailClass={detailClass} />
      }
      {
       student === "ADMIN" && toggleStateAddClass === 2 &&
       <InformationListProgramStudy />
      }
      {
       student === "ADMIN" && toggleStateAddClass === 3 &&
       <ManagerStudent />
      }
     </div>
    </div>
   }

  </>
 )
}


export default DetailClass