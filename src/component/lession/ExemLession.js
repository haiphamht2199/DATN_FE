import React, { useState, useCallback } from 'react'
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, Button, TextareaAutosize } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
function ExemLession() {
 const dispatch = useDispatch();
 const [nameExam, setNameExxam] = useState("");
 const [contentExam, setContentExam] = useState("");
 const [questionForm, setQuestionForm] = useState("tl");
 const [point, setPoint] = useState(0);
 const [level, setLevel] = useState("de");
 const [status, setStatus] = useState(1);
 const [arrayQuestions, setArrayQuestions] = useState([]);
 const [errName, setErrName] = useState(false);
 const [errContent, setErrContent] = useState(false);
 const [checkSave, setCheckSave] = useState(true);
 const [idEditQues, setIdEditQues] = useState("");
 const ChangePoint = (point) => {
  if (point < 0) {
   point = 0;
  }
  if (point > 10) {
   point = 10;
  }
  setPoint(point)
 }
 const SaveNewQuestion = (arrayQuestions, contentExam, questionForm, level, point, status, checkSave, idEditQues) => {
  if (checkSave) {
   if (contentExam) {
    setErrContent(false)
    let id = (Math.random() + 1).toString(36).substring(7);
    arrayQuestions.push({
     id: id,
     contentExam: contentExam,
     questionForm: questionForm,
     point: point,
     level: level,
     status: status
    });
   } else {
    setErrContent(true)
   }
  } else {
   let indexEdit = 0;
   let newEditQues = {};
   for (let i = 0; i < arrayQuestions.length; i++) {
    if (arrayQuestions[i].id === idEditQues) {
     indexEdit = i;
     newEditQues = {
      id: indexEdit,
      contentExam: contentExam,
      questionForm: questionForm,
      point: point,
      level: level,
      status: status
     }
     break;
    }
   }
   arrayQuestions[indexEdit] = newEditQues;

  }
  setArrayQuestions(arrayQuestions);
  setContentExam("");
  setPoint(0);
  setLevel("de");
  setStatus("0")

 };
 const editQuestion = (newQuestion, checkSave) => {
  setIdEditQues(newQuestion.id);
  setCheckSave(false)
  setContentExam(newQuestion.contentExam);
  setPoint(newQuestion.point);
  setLevel(newQuestion.level);
  setStatus(newQuestion.status)
 }
 const DeleteQuestion = (id, arrayQuestions) => {
  arrayQuestions = arrayQuestions.filter(ques => ques.id !== id);
  setArrayQuestions(arrayQuestions);
 }
 return (
  <>
   <div
    className="content  active-content"
   >
    <div className='content_kiem_tra'>
     <div className='top_content_kiem_tra'>
      <div className='label_kiem_tra'>
       <InputLabel required >Tên bài kiểm tra </InputLabel>
      </div>
      <div className='input_ten_kiem_tra'>
       <TextField
        name="fullName"
        variant="outlined"
        type='text'
        fullWidth
        value={nameExam}
        onChange={(e) => setNameExxam(e.target.value)}
        placeholder='Nhập tên kiểm tra'
       />
      </div>
     </div>
     {
      errName && <div style={{ color: "red", marginLeft: "22%", marginTop: "-20px" }}>Tên không được để trống!</div>
     }
     <div className='button_submit_kt'>
      <div className='labelbutton_submit'>
       <InputLabel required >Thêm mới câu hỏi </InputLabel>
      </div>
      <div className='btn_submit_kt'>
       <Button variant="contained">Thêm mới câu hỏi</Button>
      </div>
     </div>
     <div className='content_kiem_tra_new'>
      <div className='content_kt1'>
       <div className='labelbutton_submit'>
        <InputLabel required >Nội dung câu hỏi  </InputLabel>
       </div>
       <div className='nhap_noi_dung_kt'>
        <TextareaAutosize
         value={contentExam}
         onChange={(e) => setContentExam(e.target.value)}
         placeholder="Nhập nội dung câu hỏi tại đây"
         style={{ width: 680, height: 100, border: "1px solid rgb(233, 226, 226)" }}
        />
       </div>
       {
        errContent && <div style={{ color: "red" }}>Nội dung không được để trống!</div>
       }

      </div>
      <div className='content_kt2'>
       <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "45%", marginRight: "10%" }}>
         <InputLabel style={{ marginBottom: "5px" }} required >Điểm số câu hỏi  </InputLabel>
         <TextField
          name="fullName"
          variant="outlined"
          type='number'
          fullWidth
          value={point}
          onChange={(e) => ChangePoint(e.target.value)}
          placeholder='Nhập tên kiểm tra'
         />
        </div>
        <div style={{ width: "45%" }}>
         <InputLabel style={{ marginBottom: "5px" }} required >Dạng câu hỏi  </InputLabel>
         <FormControl variant="outlined" fullWidth >
          <Select
           name="bloodGroup"
           fullWidth
           placeholder='Chọn dạng câu hỏi'
           value={questionForm}
           onChange={(e) => setQuestionForm(e.target.value)}
          >
           <MenuItem value="tl">Tự luận</MenuItem>


          </Select>
         </FormControl>
        </div>
       </div>
       <div style={{ display: "flex", alignItems: "center", marginTop: "50px" }}>
        <div style={{ width: "45%", marginRight: "10%" }}>
         <InputLabel style={{ marginBottom: "5px" }} required >Mức độ câu hỏi  </InputLabel>
         <FormControl variant="outlined" fullWidth >
          <Select
           name="bloodGroup"
           fullWidth
           placeholder='Chọn mức độ câu hỏi'
           value={level}
           onChange={(e) => setLevel(e.target.value)}
          >
           <MenuItem value="de">Dễ</MenuItem>
           <MenuItem value="tb">Trung bình </MenuItem>
           <MenuItem value="kho">Khó</MenuItem>

          </Select>
         </FormControl>
        </div>
        <div style={{ width: "45%" }}>
         <InputLabel style={{ marginBottom: "5px" }} required >Trạng thái câu hỏi  </InputLabel>
         <FormControl variant="outlined" fullWidth >
          <Select
           name="bloodGroup"
           fullWidth
           placeholder='Chọn trạng thái câu hỏi'
           value={status}
           onChange={(e) => setStatus(e.target.value)}
          >
           <MenuItem value="1">Công khai </MenuItem>
           <MenuItem value="0">Chưa công khai </MenuItem>
          </Select>
         </FormControl>
        </div>
       </div>
      </div>
      <div className='content_kt3'>
       <div className='top_dinh_kem_file'>
        <div className='content_tai_file'>
         <InputLabel required >Tệp đính kèm</InputLabel>
         <div className='button_file'>
          <Button variant="outlined" component="label">
           Tải file
           <input hidden accept="image/*" multiple type="file" />
          </Button>

         </div>
        </div>
        <div className='icon_delete_file'>
         <DeleteIcon />
        </div>
       </div>
       <div className='resuilt_file'>
        <div className='icon_resuilt_file'>
         <InsertDriveFileIcon />
        </div>
        <div className='content_resuilt_file'>
         <p>*/upload_file/20212022/123456789101112Avdhsjksdhuifn.wav</p>
        </div>

       </div>
       <div className='ghi_chu'>
        <div className='lable_ghi_chu'>
         <span style={{ color: "red", marginRight: "3px" }}>*</span> ghi chú
        </div>
        <div className='conyent_ghi_chu'>
         <ul>
          <li>Bạn vui lòng tải lên file media có định dạng wav, âm thanh, video, scom, hình ảnh...</li>
          <li>Dung lượng tối đa 50MB.</li>
         </ul>
        </div>
       </div>
       <div className='submit_kiem_tra_moi'>
        <Button className='cancel_kt' variant="outlined">Hủy </Button>
        <Button variant="contained" onClick={() => SaveNewQuestion(arrayQuestions, contentExam, questionForm, level, point, status, checkSave, idEditQues)}>Lưu </Button>
       </div>
      </div>
     </div>
     <div className='danh_sach_cau hoi'>
      <InputLabel style={{ marginTop: "30px", paddingLeft: "20px", marginBottom: "20px" }} required >Danh sách câu hỏi</InputLabel>
     </div>
     <div className='table_question'>
      <TableContainer component={Paper}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
         <TableRow>
          <TableCell>STT</TableCell>
          <TableCell align="right">Nội dung câu hỏi</TableCell>
          <TableCell align="right">Loại câu hỏi</TableCell>
          <TableCell align="right">Điểm câu hỏi</TableCell>
          <TableCell align="right">Thao tác</TableCell>
         </TableRow>
        </TableHead>
        <TableBody>
         {arrayQuestions.length > 0 && arrayQuestions.map((row, index) => (
          <TableRow
           key={index}
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
           <TableCell component="th" scope="row">
            {index + 1}
           </TableCell>
           <TableCell align="right">{row.contentExam}</TableCell>
           <TableCell align="right">{row.questionForm === "tl" ? "Tự luận" : "Trắc nghiệm"}</TableCell>
           <TableCell align="right">{row.point}</TableCell>

           <TableCell align="right">
            <div className='action_test_axam'>
             <EditIcon className='edit_new_lesstion' onClick={() => editQuestion(row, checkSave)} />
             <DeleteIcon onClick={() => DeleteQuestion(row.id, arrayQuestions)} className='delete_new_lesstion' />
            </div>
           </TableCell>
          </TableRow>
         ))}
        </TableBody>
       </Table>
      </TableContainer>
     </div>
    </div>
   </div>
  </>
 )
}

export default ExemLession