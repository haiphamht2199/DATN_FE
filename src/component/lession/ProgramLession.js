import React, { useState, useCallback } from 'react';
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Typography, Box, Button } from "@material-ui/core";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditIcon from '@mui/icons-material/Edit';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ModalEditLession from '../modal/ModalEditLession';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ProgramLession(props) {
  const dispatch = useDispatch();
  const programs = useSelector((state) => state.lession.program);
  const _class = useSelector((state) => state._class);
  const [openCt, setOpenCt] = useState(false);
  const [modalOpen, SetModalOpen] = useState(false);
  const [toggleStateAddClass, setToggleStateAddClass] = useState(1);
  const arrayLesstion = useSelector(state => state._class.arrayProgram);
  const [nameLession, setNewLession] = useState("");
  const [nameActive, setNameActive] = useState("");
  const [editNameLession, setEditNameLession] = useState("");
  const [editNameActive, setEditNameActive] = useState("");
  const [key, setKey] = useState("");
  const [errClass, setErrorClass] = useState(false);
  const [errActive, setErroActive] = useState(false);
  const [indexPr, setIndexPr] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [programId, setProgramId] = useState("");
  const handleClickOpen = useCallback((id) => {
    setProgramId(id)
    setOpen(true);

  }, [setProgramId, programId]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = useCallback(() => {
    if (programId) {
      dispatch({
        type: 'HANDLE_DELETE_PROGRAM_CLASS',
        id: programId
      });
      setOpen(false);
    }
  }, [programId])

  const toggleTabAddClass = useCallback((index, indexProgram) => {
    dispatch({
      type: 'TOGGLE_TAB_ADD_CLASS',
      payload: { index: index, indexProgram: indexProgram }
    })
  }, [arrayLesstion]);
  console.log("arrayLesstion:", arrayLesstion)
  const ThemChuongTrinhOnClick = () => {
    setOpenCt(!openCt);
    dispatch({
      type: 'SETUP_PROGRAM_REST'
    })
  }

  const onChageNameLession = useCallback((value, index) => {
    dispatch({
      type: 'ONCHANGE_NAME_LESSION',
      value: value,
      index: index
    })
  }, [arrayLesstion]);
  const handleNameActive = useCallback((value, index) => {
    dispatch({
      type: 'ONCHANGE_NAME_ACTIVE',
      value: value,
      index: index
    })
  }, [arrayLesstion]);
  const saveNewLession = useCallback((index, arrayLesstion) => {
    if (nameLession || nameActive) {
      dispatch({
        type: 'HANDLE_SAVE_NEW_PROGRAM',
        index: index,
        arrayLesstion: arrayLesstion,
        nameLession: nameLession,
        nameActive: nameActive
      })
    }
    setNewLession("");
    setNameActive("")
  }, [arrayLesstion, nameLession, nameActive]);
  const DeleteNewLession = useCallback((id, index) => {
    dispatch({
      type: 'DELETE_LESSISON_ACTIVE',
      id,
      index
    })
  }, []);
  const DeleteNewTask = useCallback((id, index) => {
    dispatch({
      type: 'DELETE_LESSISON_TASK',
      id,
      index
    })
  }, []);
  const EditLession = useCallback((item, index) => {
    dispatch({
      type: 'GET_EIDT_LESSON',
      payload: item
    });
    setEditNameLession(item);
    SetModalOpen(true);
    setKey(0);
    setIndexPr(index)
  }, [editNameLession, indexPr, key]);
  const EditActive = useCallback((item) => {
    setEditNameActive(item);
    SetModalOpen(true);
    setKey(1)
  }, []);
  const handleAddAnotherRow = useCallback(() => {
    dispatch({
      type: 'HANDLE_ADD_ANOTHER_ROW'
    })
  }, [arrayLesstion]);
  const handleNameProgram = useCallback((value, index) => {
    dispatch({
      type: 'HANDLE_NEW_NAME_PROGRAM',
      value: value,
      index: index
    })
  }, [arrayLesstion]);
  const handleSubmitCreateProgram = useCallback(() => {
    if (_class.class_id) {
      dispatch({
        type: 'HANDLE_CREATE_PROGRAM_BY_CLASS',
        payload: _class
      })
    } else {
      toast.warn("Bạn cần phải tạo lớp học đã!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }, [_class])
  return (
    <> <div>

      <Dialog
        open={open}

        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Bạn có chắc chắn muốn xóa không"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleDelete}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </div>
      <ToastContainer />
      <div>

        <ModalEditLession lessonData={editNameLession} editNameActive={editNameActive} openModal={modalOpen} SetModalOpen={SetModalOpen} quill={props.quill} quillRef={props.quillRef} _key={key} indexPr={indexPr} />
      </div>
      <div
        className="content  active-content"
      >
        <div className='top-chuong-trinh-day'>
          <div className='left-top-ctd'>
            <InputLabel style={{ fontWeight: "600" }} required >Chương trình dạy</InputLabel>
          </div>
          <div className='right-top-ctd'>
            <Button variant="contained" onClick={handleAddAnotherRow}>Thêm chương trình</Button>
          </div>
        </div>
        <div className='content_ctd'>
          {
            (!openCt === true && arrayLesstion.length === 0) ? <div className='ctd-trong'>
              <div className='icon_trong'>
                <NoteAltIcon />
              </div>
              <div className='text-trong'>
                <p>Bạn chưa có chương trình nào <br /> Vui lòng bấm <p style={{ color: "blue", cursor: "pointer" }} onClick={() => ThemChuongTrinhOnClick()}>nhấn vào đây</p> để thêm chương trình.</p>
              </div>
            </div> :
              <div className='content_ctd_new'>
                {
                  arrayLesstion && arrayLesstion.length ? arrayLesstion.map(item => (
                    <Card className='card_ctd'>
                      <div className='content_card_new'>
                        <div className='top_ctd'>
                          <div className='ten_ctd'>Chương trình #{item.index}</div>
                          <div className='xoa_ctd'>
                            <DeleteIcon onClick={() => handleClickOpen(item.index)} />
                          </div>
                        </div>
                        <div className='ten_ctd_new'>
                          <InputLabel style={{ marginBottom: "10px" }} required >Tên chương trình </InputLabel>
                          <TextField
                            variant="outlined"
                            type='text'
                            fullWidth
                            placeholder='Nhập tên chương trình tại đây'
                            value={item.nameProgramCategory ? item.nameProgramCategory : ""}
                            onChange={(e) => handleNameProgram(e.target.value, item.index ? item.index : "")}
                          />
                        </div>
                        {
                          item.createLessonRequestList.length > 0 ? item.createLessonRequestList.map((lession, index) => {
                            return (
                              <div className='content_array_lession' key={index}>
                                <div className='new_content_lession'>
                                  <div className='left_new_lession'>
                                    <div className='icon_new_lession'>
                                      <CheckIcon className='checkok_new_lession' />
                                      <EventNoteIcon className='note_new_lession' />
                                    </div>
                                    <div className='name_new_lession'>
                                      <p>{lession.nameLesson}</p>
                                    </div>
                                  </div>
                                  <div className='action_new_lession'>
                                    <EditIcon className='edit_new_lesstion' onClick={() => EditLession(lession, item.index)} />
                                    <DeleteIcon onClick={() => DeleteNewLession(lession.indexLesson, item.index)} className='delete_new_lesstion' />
                                  </div>
                                </div>
                              </div>
                            )
                          }) : ""
                        }
                        {
                          item.createTaskRequestList.length > 0 ? item.createTaskRequestList.map((lession, index) => {
                            return (
                              <div className='content_array_lession' key={index}>
                                <div className='new_content_lession'>
                                  <div className='left_new_lession'>
                                    <div className='icon_new_lession'>
                                      <CheckIcon className='checkok_new_lession' />
                                      <PendingActionsIcon className='active_new_lession' />
                                    </div>
                                    <div className='name_new_lession'>
                                      <p>{lession.nameTask}</p>
                                    </div>
                                  </div>
                                  <div className='action_new_lession'>
                                    <EditIcon className='edit_new_lesstion' onClick={() => EditActive(lession)} />
                                    <DeleteIcon onClick={() => DeleteNewTask(lession.index, item.index)} className='delete_new_lesstion' />
                                  </div>
                                </div>
                              </div>
                            )
                          }) : ""
                        }

                        <div className='ten_baihoc_hoatdong'>
                          <div className="bloc-tabs_add_class">

                            <div
                              className={item.toggleStateAddClass === 1 ? "tabs_add_class active-tabs_add_class" : "tabs_add_class"}
                              onClick={() => toggleTabAddClass(1, item.index)}
                            >
                              Tên bài học
                            </div>

                            <div
                              className={item.toggleStateAddClass === 2 ? "tabs_add_class active-tabs_add_class" : "tabs_add_class"}
                              onClick={() => toggleTabAddClass(2, item.index)}
                            >
                              Hoạt đông
                            </div>
                          </div>
                          {
                            item.toggleStateAddClass === 1 &&
                            <div className='ten_bai_hoc_content'>
                              <div className='ten_bai_hoc'>
                                <InputLabel required >Tên bài học</InputLabel>
                              </div>
                              <div className='input_ten_bai_hoc'>
                                <TextField
                                  name="nameNewLession"
                                  variant="outlined"
                                  type='text'
                                  value={nameLession}
                                  onChange={(e) => setNewLession(e.target.value)}
                                  fullWidth
                                  placeholder='Nhập tên bài tại đây'
                                />
                              </div>
                              {
                                !item.errClass && <div style={{ color: "red", paddingLeft: "20px", marginBottom: "20px" }}>Tên bài học không được để trống!</div>
                              }
                            </div>
                          }
                          {
                            item.toggleStateAddClass === 2 &&
                            <div className='ten_bai_hoc_content'>
                              <div className='ten_bai_hoc'>
                                <InputLabel required >Tên hoạt động </InputLabel>
                              </div>
                              <div className='input_ten_bai_hoc'>
                                <TextField
                                  name="fullName"
                                  variant="outlined"
                                  type='text'
                                  value={nameActive}
                                  fullWidth
                                  onChange={(e) => setNameActive(e.target.value)}
                                  placeholder='Nhập tên hoạt động tại đây'
                                />
                              </div>
                              {
                                errActive && <div style={{ color: "red", paddingLeft: "20px", marginBottom: "20px" }}>Tên hoạt động không được để trống!</div>
                              }
                            </div>
                          }


                        </div>
                        <div className='submit_new_lession_action'>
                          <Button onClick={() => saveNewLession(item.index, arrayLesstion)} variant="contained">Lưu</Button>
                        </div>
                      </div>
                    </Card>
                  )) : ""
                }

              </div>
          }

          <div className='btn_next_prev'>
            <div className='btn_prev'>
              <Button variant="contained">Quay lại</Button>
            </div>
            <div className='btn_next'>
              <Button variant="contained" disabled={arrayLesstion.length ? false : true} onClick={handleSubmitCreateProgram}>Tiếp tục</Button>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default ProgramLession