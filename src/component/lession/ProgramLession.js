import React, { useState, useCallback } from 'react';
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Typography, Box, Button } from "@material-ui/core";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditIcon from '@mui/icons-material/Edit';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ModalEditLession from '../modal/ModalEditLession';
import { useDispatch, useSelector } from "react-redux";
function ProgramLession(props) {
  const dispatch = useDispatch();
  const programs = useSelector((state) => state.lession.program);
  console.log("programs:", programs)
  const [openCt, setOpenCt] = useState(false);
  const [modalOpen, SetModalOpen] = useState(false);
  const [toggleStateAddClass, setToggleStateAddClass] = useState(1);
  let [arrayLesstion, setArrayLession] = useState([]);
  const [nameLession, setNewLession] = useState("");
  const [nameActive, setNameActive] = useState("");
  const [editNameLession, setEditNameLession] = useState("");
  const [key, setKey] = useState("");
  const [errClass, setErrorClass] = useState(false);
  const [errActive, setErroActive] = useState(false)
  const toggleTabAddClass = (index) => {
    setToggleStateAddClass(index);
  }
  const ThemChuongTrinhOnClick = () => {
    setOpenCt(!openCt)
  }
  const onChageNameLession = (value) => {
    setNewLession(value)
  }
  const saveNewLession = useCallback((nameLession, arrayLesstion, toggleStateAddClass, nameActive, programs) => {
    if (toggleStateAddClass === 1) {
      if (nameLession) {
        console.log("nameLession:", nameLession)
        dispatch({
          type: 'ADD_NEW_CONTENT_LESSION',
          nameLession,
          programs
        })
        setNewLession("");
        setErrorClass(false);
      } else {
        setErrorClass(true);
      }
    } else if (toggleStateAddClass === 2) {
      if (nameActive) {
        dispatch({
          type: 'ADD_NEW_ACTIVE_LESSION',
          nameActive,
          programs
        })
        setNameActive("");
        setErroActive(false)
      } else {
        setErroActive(true)
      }
    }
  }, []);
  const DeleteNewLession = useCallback((id, programs) => {
    console.log({ id, programs })
    dispatch({
      type: 'DELETE_LESSISON_ACTIVE',
      id,
      programs
    })
  }, []);
  const EditLession = useCallback((name, _key) => {
    console.log("_key:", _key)
    setEditNameLession(name);
    SetModalOpen(true);
    setKey(_key)
  }, [])
  return (
    <>
      <div>

        <ModalEditLession name={editNameLession} openModal={modalOpen} SetModalOpen={SetModalOpen} quill={props.quill} quillRef={props.quillRef} _key={key} />
      </div>
      <div
        className="content  active-content"
      >
        <div className='top-chuong-trinh-day'>
          <div className='left-top-ctd'>
            <InputLabel style={{ fontWeight: "600" }} required >Chương trình dạy</InputLabel>
          </div>
          <div className='right-top-ctd'>
            <Button variant="contained">Thêm chương trình</Button>
          </div>
        </div>
        <div className='content_ctd'>
          {
            (!openCt === true && !arrayLesstion.length === 0) ? <div className='ctd-trong'>
              <div className='icon_trong'>
                <NoteAltIcon />
              </div>
              <div className='text-trong'>
                <p>Bạn chưa có chương trình nào <br /> Vui lòng bấm <p style={{ color: "blue", cursor: "pointer" }} onClick={() => ThemChuongTrinhOnClick()}>nhấn vào đây</p> để thêm chương trình.</p>
              </div>
            </div> :
              <div className='content_ctd_new'>
                <Card className='card_ctd'>
                  <div className='content_card_new'>
                    <div className='top_ctd'>
                      <div className='ten_ctd'>Chương trình #1</div>
                      <div className='xoa_ctd'>
                        <DeleteIcon />
                      </div>
                    </div>
                    <div className='ten_ctd_new'>
                      <InputLabel style={{ marginBottom: "10px" }} required >Tên chương trình </InputLabel>
                      <TextField
                        name="fullName"
                        variant="outlined"
                        type='text'
                        fullWidth
                        placeholder='Nhập tên chương trình tại đây'
                      />
                    </div>
                    {
                      programs.length > 0 && programs.map((lession, index) => {
                        return (
                          <div className='content_array_lession' key={index}>
                            <div className='new_content_lession'>
                              <div className='left_new_lession'>
                                <div className='icon_new_lession'>
                                  <CheckIcon className='checkok_new_lession' />
                                  {lession.key === "lession" ? <EventNoteIcon className='note_new_lession' /> : <PendingActionsIcon className='active_new_lession' />}
                                </div>
                                <div className='name_new_lession'>
                                  <p>{lession.name}</p>
                                </div>
                              </div>
                              <div className='action_new_lession'>
                                <EditIcon className='edit_new_lesstion' onClick={() => EditLession(lession.name, lession.key)} />
                                <DeleteIcon onClick={() => DeleteNewLession(lession.id, programs)} className='delete_new_lesstion' />
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }

                    <div className='ten_baihoc_hoatdong'>
                      <div className="bloc-tabs_add_class">

                        <div
                          className={toggleStateAddClass === 1 ? "tabs_add_class active-tabs_add_class" : "tabs_add_class"}
                          onClick={() => toggleTabAddClass(1)}
                        >
                          Tên bài học
                        </div>

                        <div
                          className={toggleStateAddClass === 2 ? "tabs_add_class active-tabs_add_class" : "tabs_add_class"}
                          onClick={() => toggleTabAddClass(2)}
                        >
                          Hoạt đông
                        </div>
                      </div>
                      {
                        toggleStateAddClass === 1 &&
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
                              onChange={(e) => onChageNameLession(e.target.value)}
                              fullWidth
                              placeholder='Nhập tên bài tại đây'
                            />
                          </div>
                          {
                            errClass && <div style={{ color: "red", paddingLeft: "20px", marginBottom: "20px" }}>Tên bài học không được để trống!</div>
                          }
                        </div>
                      }
                      {
                        toggleStateAddClass === 2 &&
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
                      <Button onClick={() => saveNewLession(nameLession, arrayLesstion, toggleStateAddClass, nameActive, programs)} variant="contained">Lưu</Button>
                    </div>
                  </div>
                </Card>
              </div>
          }

          <div className='btn_next_prev'>
            <div className='btn_prev'>
              <Button variant="contained">Quay lại</Button>
            </div>
            <div className='btn_next'>
              <Button variant="contained">Tiếp tục</Button>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default ProgramLession