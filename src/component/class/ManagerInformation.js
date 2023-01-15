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
import ListInforStudent from '../tables/ListInforStudent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
function ManagerInformation() {
 const dispatch = useDispatch();
 const _class = useSelector((state) => state._class);
 const [editDetail, setEditDetail] = useState(true);
 const columns = [
  { id: 'STT', label: 'STT', minWidth: 50 },
  {
   id: 'content',
   label: 'Nội dung',
   minWidth: 170,
   align: 'right',
   format: (value) => value.toLocaleString('en-US'),
  },
  {
   id: 'time',
   label: 'Thời gian nộp bài',
   minWidth: 170,
   align: 'right',
   format: (value) => value.toLocaleString('en-US'),
  },
  {
   id: 'status',
   label: 'Trạng thái',
   minWidth: 170,
   align: 'right',
   format: (value) => value.toFixed(2),
  },
  { id: 'danhgia', label: 'Đánh giá', minWidth: 100 },
  { id: 'point', label: 'Điểm', minWidth: 100 },
 ];

 function createData(STT, content, time, status, danhgia, point) {
  return { STT, content, time, status, danhgia, point };
 }

 const rows = [
  createData('1', 'Hoạt động 1', "29/10/2022 10:10:10", "Đã nộp", "Đánh giá", "9.5"),
  createData('2', 'Hoạt động 2', "29/10/2022 10:10:10", "Đã nộp", "Đánh giá", "9.5"),
  createData('3', 'Hoạt động 3', "29/10/2022 10:10:10", "Đã nộp", "Đánh giá", "9.5"),
  createData('4', 'Hoạt động 4', "29/10/2022 10:10:10", "Đã nộp", "Đánh giá", "9.5"),
 ];
 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(10);

 const handleChangePage = (event, newPage) => {
  setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
 };
 return (
  <>
   <div className='InformationListProgramStudy'>
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
          placeholder="Nhập tên sinh viên "
          inputProps={{ 'aria-label': 'Nhập tên sinh viên' }}
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
     </div>
    </div>
    {
     editDetail ? <div className='ListProgramStudyContent'>
      <ListInforStudent setEditDetail={setEditDetail} />
     </div> :
      <div>
       <div onClick={() => setEditDetail(true)} className="back_icon">Quay trở lại</div>
       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
         <Table stickyHeader aria-label="sticky table">
          <TableHead>
           <TableRow>
            {columns.map((column) => (
             <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
             >
              {column.label}
             </TableCell>
            ))}
           </TableRow>
          </TableHead>
          <TableBody>
           {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
             return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
               {columns.map((column) => {
                const value = row[column.id];
                return (
                 <TableCell key={column.id} align={column.align}>
                  {column.format && typeof value === 'number'
                   ? column.format(value)
                   : value}
                 </TableCell>
                );
               })}
              </TableRow>
             );
            })}
          </TableBody>
         </Table>
        </TableContainer>
        <TablePagination
         rowsPerPageOptions={[10, 25, 100]}
         component="div"
         count={rows.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
        />

       </Paper>
       <div className='timeLine_student_detail_history_comment'>
        <div className='timeLine_student_detail'>
         <p style={{ textAlign: "center", fontSize: "18px", color: "#385cce", marginTop: "5px" }}>Time hoạt động hệ thống.</p>
         <Timeline position="alternate">
          <TimelineItem>
           <TimelineOppositeContent color="text.secondary">
            Bài học
           </TimelineOppositeContent>
           <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
           </TimelineSeparator>
           <TimelineContent>Bắt đầu học bài học số 1 29/10/2022 10:10:10</TimelineContent>
          </TimelineItem>
          <TimelineItem>
           <TimelineOppositeContent color="text.secondary">
            Bình luận
           </TimelineOppositeContent>
           <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
           </TimelineSeparator>
           <TimelineContent>Bình luận bài số 1:"Tại sao 1+1 = 2"</TimelineContent>
          </TimelineItem>
          <TimelineItem>
           <TimelineOppositeContent color="text.secondary">
            Hoạt động
           </TimelineOppositeContent>
           <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
           </TimelineSeparator>
           <TimelineContent>Bắt đầu học hoạt động số 1 29/10/2022 10:10:10</TimelineContent>
          </TimelineItem>
          <TimelineItem>
           <TimelineOppositeContent color="text.secondary">
            Bài học
           </TimelineOppositeContent>
           <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
           </TimelineSeparator>
           <TimelineContent>Hoàn thành bài học số 1 29/10/2022 11:10:10 </TimelineContent>
          </TimelineItem>
         </Timeline>
        </div>
        <div className='history_comment'></div>
       </div>
      </div>
    }

   </div>
  </>
 )
}


export default ManagerInformation