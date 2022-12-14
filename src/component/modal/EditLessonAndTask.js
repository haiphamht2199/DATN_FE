import React, { useState, useEffect, useCallback } from 'react'
import { Dialog, Select, MenuItem, DialogTitle, DialogContent, makeStyles, Switch, FormGroup, Typography, Button, TextField, InputLabel, OutlinedInput, FormControl, InputAdornment, FormLabel, Radio, FormControlLabel, RadioGroup } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import { useQuill } from 'react-quilljs';
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import axios from '../../helper/axiosImage'
import 'quill/dist/quill.snow.css';
import lession from '../../redux/saga/lession';
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

function EditLessonAndTask(props) {
  const dispatch = useDispatch();
  let edit = useSelector(state => state._class.editLesson)
  const [value, setValue] = useState();
  const [auth, setAuth] = useState(true);
  const { lessonData, openModal, setOpenModalLessonAndTask, indexPr, editNameActive, _key } = props;
  console.log("editNameActive:", editNameActive)

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
  const [isRequireFinishTask, setIsRequireFinishTask] = useState("");
  const toggleTab = (index) => {
    setToggleState(index)
  }
  const handleChangeActive = (event) => {
    editNameActive.isRequireFinishTask = event.target.checked
    setIsRequireFinishTask(event.target.checked);
  };
  const handleChangeDescription = (html) => {
    if (html !== undefined && editNameActive && editNameActive.descriptionLesson) {
      editNameActive.descriptionLesson = html;
      setDescriptionLesson(html)
    }

  }
  const handleChangeDescriptionTask = (html) => {
    editNameActive.descriptionTask = html;
    setDescriptionActive(value)
  }
  const handleChangeNameLession = useCallback((value) => {
    editNameActive.nameLesson = value;
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
    editNameActive.typeLesson = value;
    setTypeLesson(value);
  }, [editNameActive]);
  const handleChangeTypeTask = useCallback((value) => {
    editNameActive.typeTask = value;
    setTypeLesson(value);
  }, [editNameActive, typeActive]);
  const handleChangeTimeDuration = useCallback((value) => {
    editNameActive.timeDuration = value;
    setTimeDuration(value)
  }, [editNameActive]);
  const handletimeDurationTask = useCallback((value) => {
    editNameActive.timeDurationTask = value;
    setTimeDurationActive(value)
  }, [editNameActive]);
  const handleChangeScopeLesson = useCallback((value) => {
    editNameActive.scope = value;
    setScopeLesson(value)
  }, [editNameActive])
  const handleSaveProgram = useCallback(() => {
    dispatch({
      type: 'HANDLE_SAVE_EDIT_PROGRAM',
      payload: { nameLesson, descriptionLesson, imageLesson, typeLesson, timeDuration, scopeLesson, indexPr, _key, editNameActive }
    })

  }, [])
  return (
    <Dialog open={props.openModalLessonAndTask} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, color: "white" }} className="customize_modal">
            {props._key === "lession" ? "Ch???nh s???a b??i h???c" : "Ho???t ?????ng b??i h???c"}
          </Typography>
          < Button
            color="white"
            onClick={() => { setOpenModalLessonAndTask(false); setValue("") }}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {
          editNameActive.lessonId ?

            editNameActive.lessonId &&
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
                        value={editNameActive.nameLesson}
                        onChange={(e) => handleChangeNameLession(e.target.value)}
                      />
                    </div>
                    <div className='image_edit_lesstion'>
                      {
                        editNameActive.pathFile ? <div className='content_image'>

                          <img src={require(`../../resource/${editNameActive.pathFile.replaceAll('\\', "/")}`)} alt="updateimage" className='image_class_preview'></img>

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
                          value={editNameActive.description ? editNameActive.description : ""}
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
                          value={editNameActive.type}
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
                          value={editNameActive.timeDuration}
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
                          value={editNameActive.scope}
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
                    <Button variant="outlined" onClick={() => { setOpenModalLessonAndTask(false) }}>H???y</Button>
                  </div>
                  <div className='save_edit'>
                    <Button variant="contained" onClick={() => { setOpenModalLessonAndTask(false); setValue("") }}>L??u</Button>
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
                  value={""}
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
                  value={""}
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
                    value={""}
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
                  value={""}
                  onChange={e => handletimeDurationTask(e.target.value)}
                  endAdornment={<InputAdornment

                    position="end">/gi???</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />

              </div>
              <div>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked
                        checked={""}
                        onChange={handleChangeActive}
                        aria-label="login switch"
                      />
                    }
                    label={"Y??u c???u ho??n th??nh"}
                  />
                </FormGroup>
              </div>
              <div className='Save_cancel_edit'>
                <div className='cancel_edit'>
                  <Button variant="outlined" onClick={() => { setOpenModalLessonAndTask(false) }}>H???y</Button>
                </div>
                <div className='save_edit'>
                  <Button variant="contained" onClick={() => { setOpenModalLessonAndTask(false) }} >L??u</Button>
                </div>
              </div>
            </div>
        }

      </DialogContent>
    </Dialog>
  )
}

export default EditLessonAndTask