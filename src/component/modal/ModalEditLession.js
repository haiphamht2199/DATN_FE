import React, { useState, useEffect, useCallback } from 'react'
import { Dialog, Select, MenuItem, DialogTitle, DialogContent, makeStyles, Switch, FormGroup, Typography, Button, TextField, InputLabel, OutlinedInput, FormControl, InputAdornment, FormLabel, Radio, FormControlLabel, RadioGroup } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import { useQuill } from 'react-quilljs';
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import axios from '../../helper/axiosImage'
import 'quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import Moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block"
];

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    // padding: theme.spacing(2),
    position: 'absolute',
    top: "0%",
    width: "50%",
    height: "auto",
    marginBottom: "20px",
  },
  dialogTitle: {
    paddingRight: '10px',
    background: "#385cce",
    color: "white"
  }
}))
function ModalEditLession(props) {
  const dispatch = useDispatch();
  let edit = useSelector(state => state._class.editLesson)
  const [value, setValue] = useState();
  const [auth, setAuth] = useState(true);
  const { lessonData, openModal, SetModalOpen, indexPr, editNameActive, _key } = props;
  console.log("editNameActive:", editNameActive)
  const [endDate, setEndDate] = useState("");
  console.log("endDate:", endDate)
  const [nameLesson, setNameLesson] = useState("");
  const [descriptionLesson, setDescriptionLesson] = useState("");
  const [imageLesson, setImageLesson] = useState("")
  const [typeLesson, setTypeLesson] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  let [scopeLesson, setScopeLesson] = useState("");
  const classes = useStyles();
  const [toggleState, setToggleState] = useState(1);
  const [typeActive, setTypeActive] = useState("");
  const [nameTask, setNameActive] = useState("");
  const [timeDurationTask, setTimeDurationActive] = useState("");
  const [descriptionTask, setDescriptionActive] = useState("");
  const [isRequireFinishTask, setIsRequireFinishTask] = useState(true);
  const toggleTab = (index) => {
    setToggleState(index)
  }
  const handleChangeActive = (event) => {
    editNameActive.isRequireFinishTask = event.target.checked ? 1 : 0
    setIsRequireFinishTask(event.target.checked);
  };
  const handleChangeDescription = (html) => {
    lessonData.descriptionLesson = html;
    setDescriptionLesson(value)
  }
  const handleChangeDescriptionTask = (html) => {
    editNameActive.descriptionTask = html;
    setDescriptionActive(value)
  }
  const handleChangeNameLession = useCallback((value) => {
    lessonData.nameLesson = value;
    setNameLesson(value)
  }, [lessonData, nameLesson]);
  const handleChangeNameTask = useCallback((value) => {
    editNameActive.nameTask = value;
    setNameActive(value)
  }, [editNameActive, nameTask])
  const handleImage = async (e) => {
    let file = e.target.files[0];
    let imageData = new FormData();
    imageData.append("file_lesson ", file);
    setValue({
      ...value,
      filePreview: URL.createObjectURL(file)
    });
    try {
      let data = await axios.post('/teacher/lesson/up_load_image_lesson', imageData);
      if (data.data.code === 200) {
        lessonData.pathLesson = data.data.data.replaceAll("\\", "/");
      }
    } catch (error) {

    }
  }
  const handleChangeTypeLesson = useCallback((value) => {
    lessonData.typeLesson = value;
    setTypeLesson(value);
  }, [lessonData]);
  const handleChangeTypeTask = useCallback((value) => {
    editNameActive.typeTask = value;
    setTypeLesson(value);
  }, [editNameActive, typeActive]);
  const handleChangeTimeDuration = useCallback((value) => {
    lessonData.timeDuration = value;
    setTimeDuration(value)
  }, [lessonData]);
  const handletimeDurationTask = useCallback((value) => {
    editNameActive.timeDurationTask = value;
    setTimeDurationActive(value)
  }, [editNameActive]);
  const handleChangeScopeLesson = useCallback((value) => {
    lessonData.scopeLesson = value;
    setScopeLesson(value)
  }, [lessonData])
  const handleSaveProgram = useCallback(() => {
    dispatch({
      type: 'HANDLE_SAVE_EDIT_PROGRAM',
      payload: { nameLesson, descriptionLesson, imageLesson, typeLesson, timeDuration, scopeLesson, indexPr, _key, editNameActive }
    })

  }, []);
  const handleEndDateChange = useCallback((value) => {
    let _value = Moment(value).format('DD/MM/YYYY') + " " + Moment(value).format('HH:mm:ss');
    setEndDate(value);
    editNameActive.timeDateFinished = _value
    dispatch({
      type: 'CHANGE_END_DATE_TASK',
      value: _value
    })
  }, [endDate, editNameActive]);
  return (
    <Dialog open={openModal} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle} >
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, color: "white" }} >
            {props._key === "lession" ? "Ch???nh s???a b??i h???c" : "Ho???t ?????ng b??i h???c"}
          </Typography>
          < Button
            color="white"
            onClick={() => { SetModalOpen(false); setValue("") }}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {
          props._key === 0 ?

            lessonData &&
            <div className='edit_lession'>
              <div className="bloc-tabs">
                <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  N???i dung b??i h???c
                </button>
                <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  C??i ?????t b??i h???c
                </button>
              </div>
              <div className='content_edit_lession'>
                {
                  toggleState === 1 &&
                  <div className='content_edit'>
                    <div className='edit_name_lession'>
                      <InputLabel style={{ marginBottom: "10px" }} required>T??n b??i h???c </InputLabel>
                    </div>
                    <div>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={lessonData.nameLesson}
                        onChange={(e) => handleChangeNameLession(e.target.value)}
                      />
                    </div>
                    <div className='image_edit_lesstion'>
                      {
                        lessonData.pathLesson ? <div className='content_image'>

                          {value ? <img src={value.filePreview} alt="updateimage" className='image_class_preview'></img> : <img src={require(`../../resource/${lessonData.pathLesson}`)} alt="updateimage" className='image_class_preview'></img>
                          }


                        </div> : <div>
                          <div className='icon_image_upload'>
                            <ImageIcon className='icon_edit_customize_image' />
                          </div>
                          <div className='btn_edit_upload'>
                            <Button variant="contained" component="label">
                              Upload ???nh
                              <input onChange={handleImage} hidden accept="image/*" multiple type="file" />
                            </Button>
                          </div>
                        </div>
                      }


                    </div>
                    <div className='descript_class'>
                      <InputLabel  >M?? t??? n???i dung b??i h???c t???i ????y </InputLabel>
                      <div style={{ width: "100%", height: '200px' }}>
                        <ReactQuill
                          theme="snow"
                          value={lessonData.descriptionLesson}
                          onChange={handleChangeDescription}
                          placeholder={" Nh???p m?? t??? n???i dung b??i h???c t???i ????y"}
                          // modules={modules('t1')}
                          formats={formats}
                          style={{ height: "200px" }}
                        />
                      </div>
                    </div>
                  </div>


                }
                {
                  toggleState === 2 &&
                  <div className='edit_setting_lession'>
                    <div className='top_setting'>
                      <div className='type_lession'>
                        <InputLabel style={{ marginBottom: "10px" }} required>Lo???i b??i h???c </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="bloodGroup"
                          fullWidth
                          value={lessonData.typeLesson}
                          onChange={(e) => handleChangeTypeLesson(e.target.value)}
                        >
                          <MenuItem value="0"> B??i h???c l?? thuy???t</MenuItem>
                          <MenuItem value="1">B??i h???c b??i t???p</MenuItem>
                        </Select>
                      </div>
                      <div className='time_lession'>
                        <InputLabel style={{ marginBottom: "10px" }} required>Th???i l?????ng </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          fullWidth
                          value={lessonData.timeDuration}
                          onChange={(e) => handleChangeTimeDuration(e.target.value)}
                          endAdornment={<InputAdornment position="end">/gi???</InputAdornment>}
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                        />
                      </div>
                    </div>
                    <div className='setting_lession'>
                      <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group" required>C??i ?????t b??i h???c </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={lessonData.scopeLesson}
                          onChange={(e) => handleChangeScopeLesson(e.target.value)}
                        >
                          <FormControlLabel control={<Radio value="0" />} label="C??ng khai" />
                          <FormControlLabel control={<Radio value="1" />} label="Kh??ng c??ng khai" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                }
                <div className='Save_cancel_edit'>
                  <div className='cancel_edit'>
                    <Button variant="outlined" onClick={() => { SetModalOpen(false) }}>H???y</Button>
                  </div>
                  <div className='save_edit'>
                    <Button variant="contained" onClick={() => { SetModalOpen(false); setValue("") }}>L??u</Button>
                  </div>
                </div>
              </div>
            </div>

            :
            <div className='content_edit'>
              <div className='edit_name_lession'>
                <InputLabel style={{ marginBottom: "10px" }} required>T??n ho???t ?????ng </InputLabel>
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editNameActive.nameTask}
                  onChange={(e) => handleChangeNameTask(e.target.value)}
                />
              </div>
              <div className='edit_name_lession'>
                <InputLabel style={{ marginBottom: "10px" }} required>Ki???u  ho???t ?????ng </InputLabel>
              </div>
              <div>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="bloodGroup"
                  fullWidth
                  value={editNameActive.typeTask}
                  onChange={(e) => handleChangeTypeTask(e.target.value)}
                >
                  <MenuItem value="1"> T??? ?????ng chia nh??m</MenuItem>
                </Select>
              </div>
              <div className='edit_name_lession'>
                <InputLabel style={{ marginBottom: "10px" }} required>Danh s??ch sinh vi??n </InputLabel>
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="outlined"
                  value="" />
              </div>
              <div className='descript_class'>
                <InputLabel  >M?? t??? n???i dung ho???t ?????ng </InputLabel>
                <div style={{ width: "100%", height: '200px' }}>
                  <ReactQuill
                    theme="snow"
                    value={editNameActive.descriptionTask}
                    onChange={handleChangeDescriptionTask}
                    placeholder={" Nh???p m?? t??? n???i dung ho???t ?????ng t???i ????y"}
                    // modules={modules('t1')}
                    formats={formats}
                    style={{ height: "200px" }}
                  />
                </div>
              </div>
              <div className="time_active">
                <InputLabel style={{ marginBottom: "10px" }} required>Th???i l?????ng ho???t ?????ng  </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  type='number'
                  value={editNameActive.timeDurationTask}
                  onChange={e => handletimeDurationTask(e.target.value)}
                  endAdornment={<InputAdornment

                    position="end">/gi???</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />

              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className='isRequireFinishTask'>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={editNameActive.isRequireFinishTask}
                          onChange={handleChangeActive}
                          aria-label="login switch"
                        />
                      }
                      label={"Y??u c???u ho??n th??nh"}
                    />
                  </FormGroup>
                </div>
                {
                  isRequireFinishTask === true && <div className='end_time'>
                    <InputLabel required >Th???i gian ho??n th??nh</InputLabel>
                    <DatePicker
                      id={"bss_pl_from_date"}
                      selected={endDate}
                      onChange={handleEndDateChange}
                      selectsEnd
                      showTimeSelect
                      dateFormat={"MMMM d, yyyy h:mm aa"}
                      isClearable={endDate != ''}
                    />
                  </div>
                }

              </div>

              <div className='Save_cancel_edit'>
                <div className='cancel_edit'>
                  <Button variant="outlined" onClick={() => { SetModalOpen(false) }}>H???y</Button>
                </div>
                <div className='save_edit'>
                  <Button variant="contained" onClick={() => { SetModalOpen(false) }} >L??u</Button>
                </div>
              </div>
            </div>
        }

      </DialogContent>
    </Dialog>
  )
}

export default ModalEditLession