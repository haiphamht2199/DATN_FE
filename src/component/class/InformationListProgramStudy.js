import React, { useState } from 'react'
import { Paper, Button } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { DataGrid } from '@mui/x-data-grid';
import SettingsIcon from '@mui/icons-material/Settings';
function InformationListProgramStudy() {
 const columns = [
  { field: 'id', headerName: 'STT', width: 70 },
  { field: 'nameProgram', headerName: 'Tên chương trình', width: 200 },
  { field: 'createUser', headerName: 'Người tạo', width: 200 },
  {
   field: 'startDate',
   headerName: 'Thời gian tạo',

   width: 200,
  },
  {
   field: 'editDate',
   headerName: 'Thời gian chỉnh sửa',
   description: 'This column has a value getter and is not sortable.',
   sortable: false,
   width: 200,
  },
  {
   field: 'status',
   headerName: 'Trạng thái',

   width: 150,
  },
  {
   field: 'action',
   headerName: 'Thao thác',
   width: 150,
   SourceBuffer: true
  },
 ];

 const rows = [
  { id: 1, nameProgram: 'Chương trình số 1 ', createUser: 'Phạm Đình Hải', startDate: "10:00,29/10/2022", editDate: "10:00,30/10/2022", status: "Hoạt động", action: <SettingsIcon /> },
  { id: 2, nameProgram: 'Chương trình số 2 ', createUser: 'Vương Xuân Hiệu', startDate: "10:00,29/10/2022", editDate: "10:00,30/10/2022", status: "Hoạt động", action: "cài đặt" },
  { id: 3, nameProgram: 'Chương trình số 3 ', createUser: 'Phạm Đình Hải', startDate: "10:00,29/10/2022", editDate: "10:00,30/10/2022", status: "Hoạt động", action: "cài đặt" },
 ];

 return (
  <div className='InformationListProgramStudy'>
   <div className='listActionProgramStudy'>
    <div className='array_filter'>
     <div className='search_lession'>
      <div className='search'>

       <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
       >
        <InputBase
         sx={{ ml: 1, flex: 1 }}
         placeholder="Nhập tên chương trình "
         inputProps={{ 'aria-label': 'Nhập tên chương trình' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
         <SearchIcon />
        </IconButton>
       </Paper>

      </div>
      <div className='filter_lessions'>
       <Button variant="contained" startIcon={<FilterAltIcon className='icon_filter' />}>
        Bộ lọc
       </Button>
      </div>
     </div>
     <div className='btn_search_reset btn_list_program_study'>
      <div className='btn_reset'>
       <Button variant="outlined" startIcon={< AutorenewIcon />}>
        Làm mới
       </Button>
      </div>
      <div className='btn_search'>
       <Button variant="contained" startIcon={<SearchIcon />}>
        Tìm kiếm
       </Button>
      </div>
     </div>
    </div>
   </div>
   <div className='ListProgramStudyContent'>
    <div style={{ height: 400, width: '100%' }}>
     <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}

     />
    </div>
   </div>
  </div>
 )
}

export default InformationListProgramStudy