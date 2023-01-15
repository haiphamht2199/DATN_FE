import React from 'react'
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LanguageIcon from '@mui/icons-material/Language';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import ParkIcon from '@mui/icons-material/Park';
function Banner() {
 return (
  <div className='bannser_homePage'>
   <div className='banner_top'>
    <div className='banner_top_left'>
     <h1>Đầu tư vào bản thân thôi nào !</h1>
     <p>Với hơn 1200 khóa học trong 18 môn hoc,bạn đảm bảo sẽ tìm được thứ phù hợp với mình</p>
     <div className='btn_banner'>Học nào</div>
    </div>
    <div className='banner_top_right'>
     <img src="https://tse1.mm.bing.net/th?id=OIP.GcjkBaxnMPNv-KAYjyG90AHaEK&pid=Api&P=0" alt="banner" />
    </div>
   </div>
   <div className='banner_botom'>
    <div className='banner_bottom_child child1'>
     <div >
      <EqualizerIcon className='incon_banner' />
     </div>
     <div className='text_banner_child'>Cơ sở ngành</div>
    </div>
    <div className='banner_bottom_child child2'>
     <div >
      <LanguageIcon className='incon_banner' />
     </div>
     <div className='text_banner_child'>Môi trường học tập công nghệ</div>
    </div>
    <div className='banner_bottom_child child3' >
     <div >
      <ManageHistoryIcon className='incon_banner' />
     </div>
     <div className='text_banner_child'>Đa phương tiện trong giáo dục và truyền thông</div>
    </div>
    <div className='banner_bottom_child child4'>
     <div >
      <FilterDramaIcon className='incon_banner' />
     </div>
     <div className='text_banner_child'>Công nghệ & đào tạo</div>
    </div>
    <div className='banner_bottom_child child5'>
     <div >
      <ParkIcon className='incon_banner' />
     </div>
     <div className='text_banner_child'>Khác</div>
    </div>
   </div>
  </div>
 )
}

export default Banner