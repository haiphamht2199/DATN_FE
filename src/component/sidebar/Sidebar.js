import React, { useState, useCallback } from 'react';
import './sidebar.css'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import DehazeIcon from '@mui/icons-material/Dehaze';
import SpeedIcon from '@mui/icons-material/Speed';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useDispatch, useSelector } from "react-redux";
function Sidebar() {
 const dispatch = useDispatch();
 const [isOpen, setIsOpen] = useState(useSelector(state => state.menu.isOpenMenu));

 const toggle = () => {
  setIsOpen(!isOpen);
  dispatch({
   type: 'CHANGE_OPEN_MENU',
   isOpen: isOpen
  })
 };
 const menuSide = [
  {
   path: "/",
   name: "Tổng quan",
   icon: <SpeedIcon />,
   isSxpan: false
  },
  {
   path: "/bai-hoc",
   name: "Bài học",
   icon: <LibraryBooksIcon />,
   icon_expan: <ExpandMoreIcon />,
   icon_expan_less: <ExpandLessIcon />,
   isSxpan: false,
   text: "Danh sách lớp học"
  },
  {
   path: "/kiem-tra",
   name: "Kiểm tra",
   icon: <RocketLaunchIcon />,
   icon_expan: <ExpandMoreIcon />,
   icon_expan_less: <ExpandLessIcon />,
   isSxpan: true,
   text: "Kiểm tra"
  },
 ]
 const [menuSides, setMenuSides] = useState(menuSide);
 const [expan, setExpan] = useState(false);
 const [expan1, setExpan1] = useState(false)
 const handleSxpan = useCallback((index) => {
  if (index === 1) {
   setExpan(!expan)
  }
  if (index === 2) {
   setExpan1(!expan1)
  }

  // console.log("isSxpan000:", item.isSxpan)
  // let newItem = {
  //  ...item,
  //  isSxpan: !item.isSxpan
  // }
  // console.log("isSxpan:", newItem.isSxpan)
  // menuSide[index] = newItem;
  // setMenuSides(menuSide)
 }, [menuSides, menuSide])
 return (
  <>
   <div style={{ width: isOpen ? "15%" : "4%" }} className='sidebar'>
    <div className='bars' style={{ paddingRight: isOpen ? "3%" : "49%" }} onClick={toggle}>
     <DehazeIcon />
    </div>
    <div className='comtenSidebar'>
     <div className='person'>
      <div className='icon_person'>
       <PersonIcon className='icon_icon' />
      </div>
      <div className='infomation_person' style={{ display: isOpen ? "block" : "none" }}>
       <p>Pham Dinh Hai</p>
       <p>@Teacher</p>
      </div>
     </div>
     {
      menuSides.map((item, index) => (
       <div>
        <div className='link_content'>
         <div className="icon">{item.icon}</div>
         <div style={{ display: isOpen ? "block" : "none", cursor: "pointer" }} className="link_text">{item.name}</div>
         <div style={{ display: isOpen ? "block" : "none" }} onClick={() => handleSxpan(index)} className=' icon_expan'>{index === 1 ? expan ? item.icon_expan_less : item.icon_expan : expan1 ? item.icon_expan_less : item.icon_expan}</div>

        </div>
        {index === 1 ? expan && <Link to={item.path}><div style={{ marginLeft: "70px", display: isOpen ? "block" : "none", cursor: "pointer" }}>{item.text}</div></Link> : expan1 && <div style={{ marginLeft: "70px", display: isOpen ? "block" : "none", cursor: "pointer" }}>{item.text}</div>}
       </div>
      ))
     }
    </div>
    <div>

    </div>
   </div>
  </>
 )
}

export default Sidebar