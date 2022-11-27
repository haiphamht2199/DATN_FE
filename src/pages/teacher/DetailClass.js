import React, { useState, useEffect } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import InfomationClass from '../../component/class/InfomationClass';
import InformationListProgramStudy from '../../component/class/InformationListProgramStudy';
function DetailClass() {
 const [toggleStateAddClass, setToggleStateAddClass] = useState(1);
 const toggleTabAddClass = (index) => {

  setToggleStateAddClass(index);
 }
 return (
  <>
   <div className='detail_class'>
    <div className='url_lession_top'>
     <div >
      <AddToPhotosIcon className='icon_lession' />
     </div>
     <div className='url_lession_detail'>
      <div className='content_url'>Danh sách lớp / lớp học số 1</div>
     </div>
    </div>
    <div className='content_detail_class'>
     <div className="bloc-tabs_detail_class">

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
     {
      toggleStateAddClass === 1 &&
      <InfomationClass />
     }
     {
      toggleStateAddClass === 2 &&
      <InformationListProgramStudy />
     }
    </div>
   </div>
  </>
 )
}

export default DetailClass