import React, { useState, useCallback, useEffect } from 'react';
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
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../helper/axios';
function ProgramLession(props) {
  const [searchParams, setSearchParams] = useSearchParams();
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
  const [add, setAdd] = useState(false)
  console.log("programCategoryIdsToRemove:", _class.programCategoryIdsToRemove);
  console.log("idsLessonToRemove:", _class.idsLessonToRemove);
  console.log("idsTaskToRemove:", _class.idsTaskToRemove)
  const handleClickOpen = useCallback((id) => {
    setProgramId(id)
    setOpen(true);

  }, [setProgramId, programId]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = useCallback(() => {
    if (programId) {
      console.log("programId:", programId)
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
  const DeleteNewLession = useCallback((id, index, lessonId) => {
    if (searchParams.get("class_id")) {
      setAdd(false);
    } else {
      setAdd(true)
    }
    dispatch({
      type: 'cccccccc',
      id,
      index,
      lessonId,
      add
    })
  }, [add]);
  const DeleteNewTask = useCallback((id, index, taskId) => {
    dispatch({
      type: 'DELETE_LESSISON_TASK',
      id,
      index,
      taskId
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
  const handleSubmitCreateProgram = useCallback(async () => {
    if (_class.class_id) {
      if (searchParams.get("class_id")) {
        console.log("array:", arrayLesstion)
        let data = {};
        let arrayData = [];
        data.classId = searchParams.get("class_id");
        data.programCategoryIdsToRemove = _class.programCategoryIdsToRemove;
        if (arrayLesstion.length) {
          arrayLesstion.forEach((element, index) => {
            let item = {};
            item.idProgramCategory = element.index;
            item.nameProgramCategory = element.nameProgramCategory;
            item.index = index + 1;
            item.editLessonRequestList = element.createLessonRequestList;
            item.idsLessonToRemove = element.idsLessonToRemove;
            element.createTaskRequestList.isRequireFinishTask = element.createTaskRequestList.isRequireFinishTask ? 1 : 0;
            item.editTaskRequestList = element.createTaskRequestList;
            item.idsTaskToRemove = element.idsTaskToRemove
            arrayData.push(item)
          });
        }
        data.inforProgramToEditRequests = arrayData;
        try {
          let dataEditRes = await axios.put('/teacher/program_category/edit', data);
          console.log("dataEditRes:", dataEditRes);
          if (dataEditRes.data.code === 200) {
            toast.success("edit program success", {
              position: toast.POSITION.TOP_CENTER
            });

          }
        } catch (error) {
          toast.warn("edit program faild !", {
            position: toast.POSITION.TOP_CENTER
          });
        }


      } else {
        try {
          if (_class) {

            if (_class.arrayProgram.length) {
              _class.arrayProgram.map(item => {
                item.classId = _class.class_id;
                delete item.toggleStateAddClass
              })
            }
            console.log("_class:", _class.arrayProgram);
            let programRes = await axios.post('/teacher/program_category/create', _class.arrayProgram);
            if (programRes.data.code === 200) {
              toast.success("create program success", {
                position: toast.POSITION.TOP_CENTER
              });
              setTimeout(() => {
                props.setToggleState(3)
              }, [])
            }
          }
        } catch (error) {

        }
        // dispatch({
        //   type: 'HANDLE_CREATE_PROGRAM_BY_CLASS',
        //   payload: _class
        // })
      }

    } else {
      toast.warn("B???n c???n ph???i t???o l???p h???c ????!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }, [_class, arrayLesstion]);
  useEffect(() => {
    if (_class.success) {
      toast.success("B???n c???n t???o l???p h???c th??nh c??ng", {
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout(() => {
        dispatch({
          type: 'DELETE_SUCCESS_ADD_CLASS'
        })
      }, [])
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
        <DialogTitle>{"B???n c?? ch???c ch???n mu???n x??a kh??ng"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>H???y</Button>
          <Button onClick={handleDelete}>?????ng ??</Button>
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
            <InputLabel style={{ fontWeight: "600" }} required >Ch????ng tr??nh d???y</InputLabel>
          </div>
          <div className='right-top-ctd'>
            <Button variant="contained" onClick={handleAddAnotherRow}>Th??m ch????ng tr??nh</Button>
          </div>
        </div>
        <div className='content_ctd'>
          {
            (!openCt === true && arrayLesstion.length === 0) ? <div className='ctd-trong'>
              <div className='icon_trong'>
                <NoteAltIcon />
              </div>
              <div className='text-trong'>
                <p>B???n ch??a c?? ch????ng tr??nh n??o <br /> Vui l??ng b???m <p style={{ color: "blue", cursor: "pointer" }} onClick={() => ThemChuongTrinhOnClick()}>nh???n v??o ????y</p> ????? th??m ch????ng tr??nh.</p>
              </div>
            </div> :
              <div className='content_ctd_new'>
                {
                  arrayLesstion && arrayLesstion.length ? arrayLesstion.map(item => (
                    <Card className='card_ctd'>
                      <div className='content_card_new'>
                        <div className='top_ctd'>
                          <div className='ten_ctd'>Ch????ng tr??nh #{item.index}</div>
                          <div className='xoa_ctd'>
                            <DeleteIcon onClick={() => handleClickOpen(item.program_category_id)} />
                          </div>
                        </div>
                        <div className='ten_ctd_new'>
                          <InputLabel style={{ marginBottom: "10px" }} required >T??n ch????ng tr??nh </InputLabel>
                          <TextField
                            variant="outlined"
                            type='text'
                            fullWidth
                            placeholder='Nh???p t??n ch????ng tr??nh t???i ????y'
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
                                    <DeleteIcon onClick={() => DeleteNewLession(lession.indexLesson, item.index, lession.lessonId)} className='delete_new_lesstion' />
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
                                    <DeleteIcon onClick={() => DeleteNewTask(lession.index, item.index, lession.taskId)} className='delete_new_lesstion' />
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
                              T??n b??i h???c
                            </div>

                            <div
                              className={item.toggleStateAddClass === 2 ? "tabs_add_class active-tabs_add_class" : "tabs_add_class"}
                              onClick={() => toggleTabAddClass(2, item.index)}
                            >
                              Ho???t ????ng
                            </div>
                          </div>
                          {
                            item.toggleStateAddClass === 1 &&
                            <div className='ten_bai_hoc_content'>
                              <div className='ten_bai_hoc'>
                                <InputLabel required >T??n b??i h???c</InputLabel>
                              </div>
                              <div className='input_ten_bai_hoc'>
                                <TextField
                                  name="nameNewLession"
                                  variant="outlined"
                                  type='text'
                                  value={nameLession}
                                  onChange={(e) => setNewLession(e.target.value)}
                                  fullWidth
                                  placeholder='Nh???p t??n b??i t???i ????y'
                                />
                              </div>
                              {
                                item.errClass && <div style={{ color: "red", paddingLeft: "20px", marginBottom: "20px" }}>T??n b??i h???c kh??ng ???????c ????? tr???ng!</div>
                              }
                            </div>
                          }
                          {
                            item.toggleStateAddClass === 2 &&
                            <div className='ten_bai_hoc_content'>
                              <div className='ten_bai_hoc'>
                                <InputLabel required >T??n ho???t ?????ng </InputLabel>
                              </div>
                              <div className='input_ten_bai_hoc'>
                                <TextField
                                  name="fullName"
                                  variant="outlined"
                                  type='text'
                                  value={nameActive}
                                  fullWidth
                                  onChange={(e) => setNameActive(e.target.value)}
                                  placeholder='Nh???p t??n ho???t ?????ng t???i ????y'
                                />
                              </div>
                              {
                                errActive && <div style={{ color: "red", paddingLeft: "20px", marginBottom: "20px" }}>T??n ho???t ?????ng kh??ng ???????c ????? tr???ng!</div>
                              }
                            </div>
                          }


                        </div>
                        <div className='submit_new_lession_action'>
                          <Button onClick={() => saveNewLession(item.index, arrayLesstion)} variant="contained">L??u</Button>
                        </div>
                      </div>
                    </Card>
                  )) : ""
                }

              </div>
          }

          <div className='btn_next_prev'>
            <div className='btn_prev'>
              <Button variant="contained">Quay l???i</Button>
            </div>
            <div className='btn_next'>
              <Button variant="contained" disabled={arrayLesstion.length || searchParams.get("class_id") ? false : true} onClick={handleSubmitCreateProgram}>Ti???p t???c</Button>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default ProgramLession