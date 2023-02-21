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
import CheckIcon from '@mui/icons-material/Check';
import DescriptionIcon from '@mui/icons-material/Description';
import pdfIcon from '../../assets/icon_upload/pdf.png';
import excelIcon from '../../assets/icon_upload/file_type_excel_icon_130611.png';
import worldIcon from '../../assets/icon_upload/file_type_word_icon_130070.png';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
function ManagerInformation() {
  const _class = useSelector((state) => state._class);
  const [editDetail, setEditDetail] = useState(true);
  const [codeStudent, setCodeStudent] = useState("");
  const [traceStudent, setTraceStudent] = useState([]);
  const [listComment, setListComment] = useState([]);
  console.log("traceStudent:", traceStudent)
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
            <ListInforStudent setEditDetail={setEditDetail} setCodeStudent={setCodeStudent} setTraceStudent={setTraceStudent} setListComment={setListComment} />
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
                    {
                      traceStudent.length ? traceStudent.map(trace => (
                        <TimelineItem>
                          <TimelineOppositeContent color="text.secondary" className={trace.type === 1 ? 'trace_lesson' : trace.type === 2 ? 'trace_task' : 'trace_comment'}>
                            {trace.type === 1 ? 'Bài học' : trace.type === 2 ? 'Hoạt động' : 'Bình luận'}
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>{trace.type === 1 ? `Bắt đầu học ${trace.content.toLocaleLowerCase()}` : trace.type === 2 ? `Bắt đầu ${trace.content.toLocaleLowerCase()}` : `Bình luận "${trace.content.toLocaleLowerCase()}"`} vào lúc {trace.start_time_trace}</TimelineContent>
                        </TimelineItem>
                      )) : <p style={{ textAlign: 'center' }}>Bạn không có hoạt động gần đây!</p>
                    }
                  </Timeline>

                </div>
                <div style={{ width: '60%' }}>
                  <div className='list_document_upload_body'>
                    <div className='header_list_document_upload'>
                      <div>
                        <DescriptionIcon />
                      </div>
                      <div>
                        Danh sách tài liệu tải lên
                      </div>

                    </div>
                    <div className='list_content_docment_upload'>
                      <div className='item_content_docment_upload'>
                        <div className='left_item_upload'>
                          <div className='icon_pdf_upload'>
                            <img src={pdfIcon} alt='icon_pdf' />
                          </div>
                          <div className='content_left_item_upload'>
                            <div className='name_upload_document'>
                              Nhóm_1_bài_tập_số_1_HĐ_1
                            </div>
                            <div className='icon_link_document_upload'>
                              <div className='icon_link'>
                                <FolderOpenIcon />
                              </div>
                              <div className='url_link_document'>
                                Hoạt_động_nhóm_doanh_nghiệp.pdf
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='right_item_upload'>
                          <MoreVertIcon className='icon_dot' />
                        </div>
                      </div>
                      <div className='item_content_docment_upload'>
                        <div className='left_item_upload'>
                          <div className='icon_pdf_upload'>
                            <img src={excelIcon} alt='icon_pdf' />
                          </div>
                          <div className='content_left_item_upload'>
                            <div className='name_upload_document'>
                              Danh_sách_nhóm_1
                            </div>
                            <div className='icon_link_document_upload'>
                              <div className='icon_link'>
                                <FolderOpenIcon />
                              </div>
                              <div className='url_link_document'>
                                Danh_sách_nhóm_1
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='right_item_upload'>
                          <MoreVertIcon className='icon_dot' />
                        </div>
                      </div>
                      <div className='item_content_docment_upload'>
                        <div className='left_item_upload'>
                          <div className='icon_pdf_upload'>
                            <img src={worldIcon} alt='icon_pdf' />
                          </div>
                          <div className='content_left_item_upload'>
                            <div className='name_upload_document'>
                              Tài_liệu_bài_tập_số_3_HĐ_3
                            </div>
                            <div className='icon_link_document_upload'>
                              <div className='icon_link'>
                                <FolderOpenIcon />
                              </div>
                              <div className='url_link_document'>
                                Tài_liệu_bài_tập_số_3_HĐ_3.docx
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='right_item_upload'>
                          <MoreVertIcon className='icon_dot' />
                        </div>
                      </div>
                      <div className='item_content_docment_upload'>
                        <div className='left_item_upload'>
                          <div className='icon_pdf_upload'>
                            <img src={excelIcon} alt='icon_pdf' />
                          </div>
                          <div className='content_left_item_upload'>
                            <div className='name_upload_document'>
                              Danh_sách_nhóm_2
                            </div>
                            <div className='icon_link_document_upload'>
                              <div className='icon_link'>
                                <FolderOpenIcon />
                              </div>
                              <div className='url_link_document'>
                                Danh_sách_nhóm_2.xlxs
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='right_item_upload'>
                          <MoreVertIcon className='icon_dot' />
                        </div>
                      </div>
                      <div className='item_content_docment_upload'>
                        <div className='left_item_upload'>
                          <div className='icon_pdf_upload'>
                            <img src={worldIcon} alt='icon_pdf' />
                          </div>
                          <div className='content_left_item_upload'>
                            <div className='name_upload_document'>
                              Nhóm_2_bài_tập_số_2_HĐ_2
                            </div>
                            <div className='icon_link_document_upload'>
                              <div className='icon_link'>
                                <FolderOpenIcon />
                              </div>
                              <div className='url_link_document'>
                                Nhóm_2_bài_tập_số_2_HĐ_2.docx
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='right_item_upload'>
                          <MoreVertIcon className='icon_dot' />
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className='history_comment'>
                    <p style={{ textAlign: "center", fontSize: "18px", color: "#385cce", marginTop: "5px" }}>Lịch sử bình luận gần đây.</p>
                    {
                      listComment.length ? <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell className='custom_time'>Thời gian</TableCell>
                              <TableCell className='custom_lesson' align="right">Bài học</TableCell>
                              <TableCell className='custom_task' align="right">Hoạt động</TableCell>
                              <TableCell className='custom_content' align="right">Nội dung</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listComment.length && listComment.map((row) => (
                              <TableRow
                                key={row.modified_time}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.modified_time}
                                </TableCell>
                                <TableCell align="center">{row.type === 1 && <CheckIcon />}</TableCell>
                                <TableCell align="center">{row.type === 2 && <CheckIcon />}</TableCell>
                                <TableCell align="center">{row.content}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer> : <p style={{ textAlign: 'center' }}>Bạn không có bình luận gần đây!</p>
                    }

                  </div>
                </div>
              </div>
            </div>
        }

      </div>
    </>
  )
}


export default ManagerInformation