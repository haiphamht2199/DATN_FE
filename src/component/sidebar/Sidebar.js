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
import { useNavigate } from "react-router-dom";
function Sidebar() {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const [isOpen, setIsOpen] = useState(useSelector(state => state.menu.isOpenMenu));
 const user = useSelector(state => state.user);

 const toggle = () => {
  setIsOpen(!isOpen);
  dispatch({
   type: 'CHANGE_OPEN_MENU',
   isOpen: isOpen
  })
 };
 const menuSide = [
  {
   path: "/home",
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


 }, [menuSides, menuSide]);
 const handleClick = useCallback((path, index) => {
  let parent = document.querySelectorAll('.customize_exspand');

  if (parent.length) {
   revoveClassList(parent, index);
   if (index === 1) {
    parent[0].classList.add("customize_side");
   } else {
    parent[1].classList.add("customize_side");
   }

  }
  if (user.student === "ADMIN") {
   navigate(path)
  } else {
   if (user.student === "STUDENT") {
    navigate('/student/home')
   }
  }
 }, [user]);
 const handleClick1 = useCallback((path, index) => {
  let parent = document.querySelectorAll('.customize_exspand');
  if (parent.length) {
   revoveClassList(parent, index)
   parent[index].classList.add("customize_side");
  }
  if (user.student === "ADMIN") {
   navigate(path)
  } else {
   if (user.student === "STUDENT") {
    navigate('/kiem-tra')
   }
  }
 }, [user]);
 const revoveClassList = (data, index) => {
  for (let i = 0; i < data.length; i++) {
   if (i !== index) {
    data[i].classList.remove("customize_side")
   }
  }
 }
 const handleClickChild = (index) => {
  if (index === 0) {
   navigate('/home')
  }
  let parent = document.querySelectorAll('.link_content');
  if (parent.length) {
   revoveClassList(parent, parent)
   parent[index].classList.add("customize_side");
  }
 }
 return (
  <>
   <div style={{ width: isOpen ? "15%" : "4%" }} className='sidebar'>
    <div className='bars' style={{ paddingRight: isOpen ? "3%" : "42%" }} onClick={toggle}>
     <DehazeIcon />
    </div>
    <div className='comtenSidebar'>
     <div className='person'>
      <div className='icon_person'>
       <PersonIcon className='icon_icon' />
      </div>
      <div className='infomation_person' style={{ display: isOpen ? "block" : "none" }}>
       <p>Pham Dinh Hai</p>
       <p>{user.student === "ADMIN" ? "@Teacher" : "@Student"}</p>
      </div>
     </div>
     <div >
      {
       menuSides.map((item, index) => (
        <div >
         <div className='link_content' onClick={() => handleClickChild(index)}>
          <div className='link_content_child'>
           <div className="icon">{item.icon}</div>
           <div style={{ display: isOpen ? "block" : "none", cursor: "pointer" }} className="link_text">{item.name}</div>
          </div>
          <div style={{ display: isOpen ? "block" : "none" }} onClick={() => handleSxpan(index)} className={`icon_expan${index + 1}`}>{index === 1 ? expan ? item.icon_expan_less : item.icon_expan : expan1 ? item.icon_expan_less : item.icon_expan}</div>

         </div>
         {index === 1 ? expan && <div onClick={() => handleClick(item.path, index)} className="customize_exspand" style={{ marginLeft: "40px", display: isOpen ? "block" : "none", cursor: "pointer" }}>{item.text}</div> : expan1 && <div className="customize_exspand" onClick={() => handleClick1("/kiem-tra", index)} style={{ marginLeft: "40px", display: isOpen ? "block" : "none", cursor: "pointer" }}>{item.text}</div>}
        </div>
       ))
      }
     </div>
    </div>
    <div>

    </div>
   </div>
  </>
 )
}

export default Sidebar