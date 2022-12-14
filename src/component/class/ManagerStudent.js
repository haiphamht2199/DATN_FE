import React, { useState, useEffect } from 'react'
import { Paper, Button } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonIcon from '@mui/icons-material/Person';
import ListStudents from '../tables/ListStudents';
import AddStudent from '../modal/AddStudent';
import EditStudent from '../modal/EditStudent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
function ManagerStudent() {
 const dispatch = useDispatch();
 const [modalOpen, SetModalOpen] = useState(false);
 const _class = useSelector((state) => state._class);
 const [searchParams, setSearchParams] = useSearchParams();
 const handleAddStudent = () => {
  SetModalOpen(!modalOpen);
 }
 useEffect(() => {
  if (_class.success) {
   console.log("success:", _class.success)
   toast.success("Edit class student succes!", {
    position: toast.POSITION.TOP_CENTER
   });
   setTimeout(() => {
    dispatch({
     type: 'DELETE_SUCCESS_ADD_CLASS'
    })
   }, 100)

  }
 }, [_class.success]);
 useEffect(() => {
  if (_class.success1) {
   toast.success("Create new student to class success!", {
    position: toast.POSITION.TOP_CENTER
   });
   setTimeout(() => {
    dispatch({
     type: 'DELETE_SUCCESS_ADD_CLASS'
    })
   }, 100)

  }
 }, [_class.success1])
 return (
  <>
   <ToastContainer />
   <div>

    <AddStudent openModal={modalOpen} SetModalOpen={SetModalOpen} />
   </div>
   <div>

    <EditStudent />
   </div>
   <div className='InformationListProgramStudy'>
    <div className='listActionProgramStudy'>
     <div className='array_filter'>
      <div className='search_lession'>
       <div className='left_top_manager'>
        <div className='search'>

         <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
         >
          <InputBase
           sx={{ ml: 1, flex: 1 }}
           placeholder="Nh???p t??n sinh vi??n "
           inputProps={{ 'aria-label': 'Nh???p t??n sinh vi??n' }}
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
       <div className='addStudent'>
        <Button variant="contained" onClick={handleAddStudent} startIcon={<PersonIcon />}>
         Th??m m???i kh??ch m???i
        </Button>
        <Button variant="contained" startIcon={<PersonIcon />}>
         Th??m nhi???u kh??ch m???i
        </Button>
       </div>
      </div>
      <div className='btn_search_reset btn_list_program_study btn_manager_student'>
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
     <div className='ListProgramStudyContent'>
      <ListStudents />
     </div>
    </div>
   </div>
  </>
 )
}


export default ManagerStudent