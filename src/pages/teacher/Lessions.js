/* eslint-disable no-octal-escape */
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Paper, Button } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import DoneIcon from '@mui/icons-material/Done';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Moment from 'moment';
const StyledMenu = styled((props) => (
 <Menu
  elevation={0}
  anchorOrigin={{
   vertical: 'bottom',
   horizontal: 'right',
  }}
  transformOrigin={{
   vertical: 'top',
   horizontal: 'right',
  }}
  {...props}
 />
))(({ theme }) => ({
 '& .MuiPaper-root': {
  borderRadius: 6,
  marginTop: theme.spacing(1),
  minWidth: 180,
  color:
   theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
  boxShadow:
   'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  '& .MuiMenu-list': {
   padding: '4px 0',
  },
  '& .MuiMenuItem-root': {
   '& .MuiSvgIcon-root': {
    fontSize: 18,
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1.5),
   },
   '&:active': {
    backgroundColor: alpha(
     theme.palette.primary.main,
     theme.palette.action.selectedOpacity,
    ),
   },
  },
 },
}));
function Lessions() {
 const listClass = useSelector(state => state._class.listClass)
 const [toggleStateAddClass, setToggleStateAddClass] = useState(1);
 const [openAction, setOpenAction] = useState(false);
 const [anchorEl, setAnchorEl] = useState(null);
 const [classId, setClassId] = useState("");
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const toggleTabAddClass = (index) => {

  setToggleStateAddClass(index);
 }
 const handleClick = useCallback((event, class_id) => {
  setAnchorEl(event.currentTarget);
  setOpenAction(!openAction);
  setClassId(class_id);
 }, [setClassId]);
 const handleClose = () => {
  setAnchorEl(null);
 };
 useEffect(() => {
  dispatch({
   type: 'GET_ALL_CLASS_REST',

  })
 }, []);
 const handlePushClick = (class_id) => {
  if (class_id) {
   return navigate(`/tao-bai-giang?class_id=${class_id}`);
  }
 }
 return (
  <div className='array_lessions'>
   <div className='url_lession_top'>
    <div >
     <AddToPhotosIcon className='icon_lession' />
    </div>
    <div className='url_lession_detail'>
     <div className='content_url'>Danh s??ch l???p/T???t c???</div>
    </div>
   </div>
   <div className='content_array_lessions'>
    <div className='array_filter'>
     <div className='search_lession'>
      <div className='search'>

       <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
       >
        <InputBase
         sx={{ ml: 1, flex: 1 }}
         placeholder="T??m ki???m theo l???p h???c"
         inputProps={{ 'aria-label': 'T??m ki???m theo l???p h???c' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
         <SearchIcon />
        </IconButton>
       </Paper>

      </div>
      <div className='filter_lessions'>
       <Button variant="contained" startIcon={<FilterAltIcon className='icon_filter' />}>
        B??? l???c
       </Button>
      </div>
     </div>
     <div className='btn_search_reset'>
      <div className='btn_reset'>
       <Button variant="outlined" startIcon={< AutorenewIcon />}>
        L??m m???i
       </Button>
      </div>
      <div className='btn_search'>
       <Button variant="contained" startIcon={<SearchIcon />}>
        T??m ki???m
       </Button>
      </div>
     </div>
    </div>
    <div className='content_lessions'>
     <div className="bloc-tabs_status_class">

      <div
       className={toggleStateAddClass === 1 ? "tabs_status_class active_tabs_status_class" : "tabs_status_class"}
       onClick={() => toggleTabAddClass(1)}
      >
       T???t c??? l???p hoc (2)
      </div>

      <div
       className={toggleStateAddClass === 2 ? "tabs_status_class active_tabs_status_class" : "tabs_status_class"}
       onClick={() => toggleTabAddClass(2)}
      >
       L???p h???c s???p di???n ra (2)
      </div>
      <div
       className={toggleStateAddClass === 3 ? "tabs_status_class active_tabs_status_class" : "tabs_status_class"}
       onClick={() => toggleTabAddClass(3)}
      >
       L???p h???c ??ang di???n ra (2)
      </div>

      <div
       className={toggleStateAddClass === 4 ? "tabs_status_class active_tabs_status_class" : "tabs_status_class"}
       onClick={() => toggleTabAddClass(4)}
      >
       L???p h???c ???? di???n ra (2)
      </div>
     </div>
     {
      listClass.length &&
      listClass.map(item =>
      (
       <div className='array_lesions_??no'>
        <div className='infomation_lession'>
         <div className='image_class_info'>
          <img src={require(`../../resource/${item.path_file_image.replaceAll('\\', '/')}`)} alt="book"></img>
         </div>
         <div className='detail_infomation'>
          <Link to={"chi-tiet-lop-hoc?class_id=" + item.class_id}>
           <div className='name_class_info'>
            <div style={{ fontSize: "20px", fontWeight: "600" }}>T??n l???p h???c: </div>
            <div style={{ fontSize: "20px", fontWeight: "600" }}>{item.name_class}</div>
           </div>
          </Link>
          <div className='infomation_base'>
           <div className='info_status'>
            <div className='icon_status_class'>
             <RemoveRedEyeIcon className='eye_icon' />
            </div>

            <div className='text_infor'>
             {item.scope_class === 1 ? "C??ng khai" : "Kh??ng c??ng khai"}
            </div>
           </div>
           <div className='info_status'>
            <div className='icon_status_class'>
             <Diversity3Icon className='list_people_icon' />
            </div>
            <div className='text_infor'>
             S??? l?????ng sinh vi??n:
            </div>
            <div className='text_infor'> {item.total_students ? item.total_students : "0"} sinh vi??n </div>
           </div>
           <div className='info_status'>
            <div className='icon_status_class check_done_public'>
             <DoneIcon className='done_public' />
            </div>
            <div className='text_infor'>
             Tr???ng th??i:
            </div>
            <div className='text_infor'>
             {item.status_class ? "Ho???t ?????ng" : "Kh??ng ho???t ?????ng"}
            </div>
           </div>
           <div className='info_status_Calendar'>
            <div className='icon_status_class'>
             <CalendarMonthIcon className='icon_calendar' />
            </div>
            <div className='Calendar_detail'>
             <div className='label_calendar' >Th???i gian di???n ra</div>
             <div className='info_calendar'>{item.start_time && item.start_time.split(" ")[0] + "-" + item.end_time && item.end_time.split(" ")[0]} </div>
            </div>
           </div>
          </div>
         </div>
        </div>
        <div className='action_lession_list' onClick={(e) => handleClick(e, item.class_id)}>
         <MoreHorizIcon className='icon_dot' />
         <div>
          <StyledMenu
           id="demo-customized-menu"
           MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
           }}
           anchorEl={anchorEl}
           open={openAction}
           onClose={handleClose}
          >
           {/* <Link to={"chi-tiet-lop-hoc?class_id=" + item.class_id}> */}
           <MenuItem disableRipple
            onClick={() => handlePushClick(classId)}
           >
            <EditIcon />

            Ch???nh s???a
           </MenuItem>
           {/* </Link> */}
           <MenuItem onClick={handleClose} disableRipple>
            <DeleteIcon />
            X??a
           </MenuItem>

          </StyledMenu>
         </div>
        </div>
       </div>
      ))

     }
    </div>
   </div>
  </div>
 )
}

export default Lessions