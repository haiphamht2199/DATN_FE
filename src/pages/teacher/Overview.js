import React from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import SpeedIcon from '@mui/icons-material/Speed';
import TableHead from '@mui/material/TableHead';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, } from 'recharts';

function TablePaginationActions(props) {
 const theme = useTheme();
 const { count, page, rowsPerPage, onPageChange } = props;

 const handleFirstPageButtonClick = (event) => {
  onPageChange(event, 0);
 };

 const handleBackButtonClick = (event) => {
  onPageChange(event, page - 1);
 };

 const handleNextButtonClick = (event) => {
  onPageChange(event, page + 1);
 };

 const handleLastPageButtonClick = (event) => {
  onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
 };

 return (
  <Box sx={{ flexShrink: 0, ml: 2.5 }}>
   <IconButton
    onClick={handleFirstPageButtonClick}
    disabled={page === 0}
    aria-label="first page"
   >
    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
   </IconButton>
   <IconButton
    onClick={handleBackButtonClick}
    disabled={page === 0}
    aria-label="previous page"
   >
    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
   </IconButton>
   <IconButton
    onClick={handleNextButtonClick}
    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
    aria-label="next page"
   >
    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
   </IconButton>
   <IconButton
    onClick={handleLastPageButtonClick}
    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
    aria-label="last page"
   >
    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
   </IconButton>
  </Box>
 );
}
TablePaginationActions.propTypes = {
 count: PropTypes.number.isRequired,
 onPageChange: PropTypes.func.isRequired,
 page: PropTypes.number.isRequired,
 rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
 return { name, calories, fat };
}

const rows = [
 createData('Tâm lý học ứng dụng ', 10, 20),
 createData('Mô phỏng thực tại', 20, 30),
 createData('Thực tại tăng cường', 30, 30),
 createData('Kĩ năng mềm', 10, 20),
 createData('Tâm lý học nghề nghiệp', 30, 20),
 createData('Giáo dục học', 30, 10),
 createData('Thiết kế phim dạy học', 40, 10),
 createData('Mô phỏng trong dạy học', 20, 30),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));
const Overview = ({ props }) => {
 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(5);

 // Avoid a layout jump when reaching the last page with empty rows.
 const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

 const handleChangePage = (event, newPage) => {
  setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
 };
 const data = [
  {
   name: '0',
   uv: 400,
   pv: 240,
   amt: 240,
  },
  {
   name: '1',
   uv: 300,
   pv: 139,
   amt: 221,
  },
  {
   name: '2',
   uv: 200,
   pv: 980,
   amt: 229,
  },
  {
   name: '3',
   uv: 278,
   pv: 390,
   amt: 200,
  },

 ];
 const data1 = [
  {
   name: '0',
   uv: 400,
   pv: 240,
   amt: 240,
  },
  {
   name: '1',
   uv: 300,
   pv: 139,
   amt: 221,
  },
  {
   name: '2',
   uv: 200,
   pv: 980,
   amt: 229,
  },
  {
   name: '3',
   uv: 278,
   pv: 390,
   amt: 200,
  },
  {
   name: '4',
   uv: 189,
   pv: 480,
   amt: 218,
  },
  {
   name: '5',
   uv: 239,
   pv: 380,
   amt: 250,
  },
  {
   name: '6',
   uv: 349,
   pv: 430,
   amt: 210,
  },
  {
   name: '7',
   uv: 189,
   pv: 480,
   amt: 218,
  },
  {
   name: '8',
   uv: 239,
   pv: 380,
   amt: 250,
  },
  {
   name: '9',
   uv: 349,
   pv: 430,
   amt: 210,
  },
 ];
 return (
  <>
   <div className='overview_container'>
    <div className='title_overview'>
     <div className='logo_titile_overview'>
      <SpeedIcon />
     </div>
     <div>
      <h2>Tổng quan thông tin </h2>
     </div>

    </div>
    <div className='table_overview'>
     <div className='title_table'>Việc cần làm </div>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="custom pagination table">
       <TableHead>
        <TableRow>
         <TableCell align="center">Lớp học </TableCell>
         <TableCell align="center">Số lượng đăng kí  </TableCell>
         <TableCell align="center">Số lượng học sinh chờ duyệt</TableCell>
        </TableRow>
       </TableHead>
       <TableBody>
        {(rowsPerPage > 0
         ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
         : rows
        ).map((row) => (
         <TableRow key={row.name}>
          <TableCell style={{ width: 100 }} align="center">
           {row.name}
          </TableCell>
          <TableCell style={{ width: 200 }} align="center" className='custom_link'>
           {row.calories}
          </TableCell>
          <TableCell style={{ width: 200 }} align="center" className='custom_link'>
           {row.fat}
          </TableCell>
         </TableRow>
        ))}

        {emptyRows > 0 && (
         <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
         </TableRow>
        )}
       </TableBody>
       <TableFooter>
        <TableRow>
         <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={3}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
           inputProps: {
            'aria-label': 'rows per page',
           },
           native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
         />
        </TableRow>
       </TableFooter>
      </Table>
     </TableContainer>
    </div>
   </div>
   <div className='chart_class_overiew'>
    <div className='chart_left'>
     <p className='text_name_chart'>Số môn học</p>
     <ResponsiveContainer width="100%" height="100%">
      <BarChart
       width={500}
       height={300}
       data={data}
       margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
       }}
      >
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="name" />
       <YAxis />
       <Tooltip />
       <Legend />
       <Bar dataKey="pv" fill="#41f9fe" />
       <Bar dataKey="uv" fill="#31c318" />
      </BarChart>
     </ResponsiveContainer>
    </div>
    <div className='chart_left'>
     <p className='text_name_chart'>Số học sinh</p>
     <ResponsiveContainer width="100%" height="100%">
      <BarChart
       width={500}
       height={300}
       data={data}
       margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
       }}
      >
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="name" />
       <YAxis />
       <Tooltip />
       <Legend />
       <Bar dataKey="pv" fill="#41f9fe" />
       <Bar dataKey="uv" fill="#31c318" />
      </BarChart>
     </ResponsiveContainer>
    </div>
   </div>
   <div className='chart_class_overiew'>
    <div className='chart_left'>
     <p className='text_name_chart'>Tỉ lệ hoàn thành bài học</p>
     <LineChart width={500} height={300} data={data1}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" interval="preserveEnd" />
      <YAxis interval="preserveEnd" />
      <Legend />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
     </LineChart>
    </div>
   </div>
  </>
 )
}


export default Overview