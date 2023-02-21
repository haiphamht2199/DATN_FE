import React, { useState, useCallback, useEffect } from 'react'
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
import axios from '../../helper/axiosImage';
import Axios from '../../helper/axios';
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
function ExemLession() {
 const [searchParams, setSearchParams] = useSearchParams();
 const [nameExam, setNameExxam] = useState("");
 const [contentExam, setContentExam] = useState("");
 const [questionForm, setQuestionForm] = useState("1");
 const [point, setPoint] = useState(0);
 const [level, setLevel] = useState("1");
 const [status, setStatus] = useState(1);
 const [arrayQuestions, setArrayQuestions] = useState([]);
 const [errName, setErrName] = useState(false);
 const [errContent, setErrContent] = useState(false);
 const [checkSave, setCheckSave] = useState(true);
 const [idEditQues, setIdEditQues] = useState("");
 const [files, setFiles] = useState("");
 const [fileExam, setFileExam] = useState("");
 const class_id = useSelector(state => state._class.class_id);
 const [examId, setExamId] = useState("");
 const [loading, setLoading] = useState(false);
 const [idsExamDetailToRemove, setIdsExamDetailToRemove] = useState([])
 const dispatch = useDispatch();
 const handleDeleteFileExam = useCallback(() => {
  if (checkSave) {
   setFileExam("");
  } else {

   for (let i = 0; i < arrayQuestions.length; i++) {
    if (arrayQuestions[i].id === idEditQues) {
     arrayQuestions[i].pathFile = "";
     break;
    }
   }
   setArrayQuestions(arrayQuestions);
   setFiles("")
   setLoading(true)
  }
 }, [checkSave, arrayQuestions, idEditQues, loading])
 const uploadHandler = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  file.isUploading = true;


  // upload file
  const formData = new FormData();
  formData.append("file_exam ", file);

  try {
   let data = await axios.post('/teacher/exam/upload_file_exam', formData);
   if (data.data.code === 200) {
    let document = { file_path_document: data.data.data, name_document: file.name }

    file.isUploading = false;
    setFiles(file.name);
    setFileExam(document)
   }
  } catch (error) {

  }
 }

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
    let id = (Math.random() + 1100);
    arrayQuestions.push({
     id: id,
     contentExamDetail: contentExam,
     typeExamDetail: questionForm,
     scoreExamDetail: point,
     levelExamDetail: level,
     status: status,
     pathFile: fileExam.file_path_document
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
      id: idEditQues,
      contentExamDetail: contentExam,
      typeExamDetail: questionForm,
      scoreExamDetail: point,
      levelExamDetail: level,
      status: status,
      pathFile: fileExam.file_path_document
     }
     break;
    }
   }
   arrayQuestions[indexEdit] = newEditQues;
   setCheckSave(true)
  }
  setArrayQuestions(arrayQuestions);
  setContentExam("");
  setPoint(0);
  setLevel("1");
  setStatus("0")
  setFiles("");
  setQuestionForm("1")
 };
 const editQuestion = (newQuestion, checkSave) => {

  setIdEditQues(newQuestion.id);
  setCheckSave(false)
  setContentExam(newQuestion.contentExamDetail);
  setPoint(newQuestion.scoreExamDetail);
  setLevel(newQuestion.levelExamDetail);
  setStatus(newQuestion.status);
  setFiles(newQuestion.pathFile);
  setQuestionForm(newQuestion.typeExamDetail)
 }
 const DeleteQuestion = (id, arrayQuestions) => {
  idsExamDetailToRemove.push(id);
  setIdsExamDetailToRemove(idsExamDetailToRemove)
  arrayQuestions = arrayQuestions.filter(ques => ques.id !== id);
  setArrayQuestions(arrayQuestions);
 }
 useEffect(() => {
  if (searchParams.get("class_id")) {

   async function fetchData(program_id) {
    if (program_id) {

     let programCategoryDetailRes = await axios.get(`/teacher/exam/create_exam/details?class_id=${program_id}`);
     if (programCategoryDetailRes.data.code === 200) {
      let data = [];
      setNameExxam(programCategoryDetailRes.data.data.name_exam);
      setExamId(programCategoryDetailRes.data.data.exam_id)
      if (programCategoryDetailRes.data.data.exam_details.length) {
       programCategoryDetailRes.data.data.exam_details.forEach(item => {
        data.push({
         id: item.exam_detail_id,
         contentExamDetail: item.content_exam_detail,
         scoreExamDetail: item.score_exam_detail,
         typeExamDetail: item.type_exam_detail,
         levelExamDetail: item.level_exam_detail,
         status: item.status,
         pathFile: item.path_file,


        })
       })
      }


      setArrayQuestions(data);
     }
    }
    // ...
   }

   fetchData(searchParams.get("class_id"));

  }
 }, [searchParams.get("class_id")]);
 const handleAddExem = useCallback(async () => {
  if (searchParams.get("class_id")) {
   let data = {};
   data.idExam = examId;
   data.nameExam = nameExam;
   let arrayExam = [];
   if (arrayQuestions.length) {
    arrayQuestions.forEach((item, index) => {
     arrayExam.push({
      idExamDetail: item.id,
      contentExamDetail: item.contentExamDetail,
      scoreExamDetail: item.scoreExamDetail,
      typeExamDetail: item.typeExamDetail,
      levelExamDetail: item.levelExamDetail,
      status: item.status,
      pathFile: item.pathFile,
      indexExamDetail: index + 1
     })
    })
   }
   data.examDetails = arrayExam;
   data.idsExamDetailToRemove = idsExamDetailToRemove
   try {
    let examRes = await Axios.put('/teacher/exam/edit', data);
    if (examRes.data.code === 200) {
     toast.success("Edit exam success!", {
      position: toast.POSITION.TOP_CENTER
     });
    }
   } catch (error) {
    toast.warn("Edit exam faild!", {
     position: toast.POSITION.TOP_CENTER
    });
   }
  } else {
   if (class_id) {
    if (nameExam) {
     let data = {};
     data.classId = class_id;
     data.nameExam = nameExam;
     let arrayExam = [];
     if (arrayQuestions.length) {
      arrayQuestions.forEach((item, index) => {
       arrayExam.push({
        contentExamDetail: item.contentExamDetail,
        scoreExamDetail: item.scoreExamDetail,
        typeExamDetail: item.typeExamDetail,
        levelExamDetail: item.levelExamDetail,
        status: item.status,
        pathFile: item.pathFile,
        indexExamDetail: index + 1
       })
      })
     }
     data.examDetails = arrayExam;
     try {
      let examRes = await Axios.post('/teacher/exam/create', data);

      if (examRes.data.code === 200) {
       toast.success("Create exam success!", {
        position: toast.POSITION.TOP_CENTER
       });
      }
     } catch (error) {
      toast.warn("tạo bài kiểm tra thất bại!", {
       position: toast.POSITION.TOP_CENTER
      });
     }


    } else {
     toast.warn("tên bài kiểm tra không được để trống!", {
      position: toast.POSITION.TOP_CENTER
     });
    }
   } else {
    toast.warn("bạn cần phải tạo lớp học đã!", {
     position: toast.POSITION.TOP_CENTER
    });
   }
  }

 }, [nameExam, arrayQuestions, class_id, examId, idsExamDetailToRemove]);

 return (
  <>
   <ToastContainer />
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
           <MenuItem value="1">Tự luận</MenuItem>


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
           <MenuItem value="1">Dễ</MenuItem>
           <MenuItem value="2">Trung bình </MenuItem>
           <MenuItem value="3">Khó</MenuItem>

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
           <input hidden multiple type="file" onChange={uploadHandler} />
          </Button>

         </div>
        </div>
        <div className='icon_delete_file' onClick={handleDeleteFileExam}>
         <DeleteIcon />
        </div>
       </div>
       <div className='resuilt_file'>
        <div className='icon_resuilt_file'>
         <InsertDriveFileIcon />
        </div>
        <div className='content_resuilt_file'>
         <p>{files}</p>
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
          <TableCell style={{ width: "10%" }}>STT</TableCell>
          <TableCell align="right" >Nội dung câu hỏi</TableCell>
          <TableCell style={{ width: "17%" }} align="right">Loại câu hỏi</TableCell>
          <TableCell style={{ width: "10%" }} align="right">Điểm</TableCell>
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
           <TableCell align="right" style={{ textAlign: "center" }}>{row.contentExamDetail}</TableCell>
           <TableCell align="right">{row.typeExamDetail === "1" ? "Tự luận" : "Trắc nghiệm"}</TableCell>
           <TableCell align="center">{row.scoreExamDetail}</TableCell>

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
    <div className='next_button'>
     <Button variant="contained" onClick={handleAddExem}>Tạo bài kiểm tra</Button>
    </div>
   </div>
  </>
 )
}

export default ExemLession