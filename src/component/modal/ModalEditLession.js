import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Switch, FormGroup, Typography, Button, TextField, InputLabel, OutlinedInput, FormControl, InputAdornment, FormLabel, Radio, FormControlLabel, RadioGroup } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import { useQuill } from 'react-quilljs';
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
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
    top: "10%",
    width: "50%",
    height: "auto",
    marginBottom: "20px",
  },
  dialogTitle: {
    paddingRight: '10px',
    background: "blue",
    color: "white"
  }
}))
function ModalEditLession(props) {

  const { quill, quillRef } = useQuill();
  const [value, setValue] = useState();
  const [auth, setAuth] = useState(true);
  const { name, openModal, SetModalOpen } = props;
  const classes = useStyles();
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index)
  }
  const handleChangeActive = (event) => {
    setAuth(event.target.checked);
  };

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        console.log(quillRef.current.firstChild.innerHTML);
        setValue(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);
  const [valueChoice, setValueChoice] = useState("1");

  const handleChange = (e) => {
    setValueChoice(e.target.value);
  };

  return (
    <Dialog open={openModal} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, color: "white" }}>
            {props._key === "lession" ? "Chỉnh sửa bài học" : "Hoạt động bài học"}
          </Typography>
          < Button
            color="white"
            onClick={() => { SetModalOpen(false) }}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {
          props._key === "lession" ?
            <div className='edit_lession'>
              <div className="bloc-tabs">
                <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Nội dung bài học
                </button>
                <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Cài đặt bài học
                </button>
              </div>
              <div className='content_edit_lession'>
                {
                  toggleState === 1 &&
                  <div className='content_edit'>
                    <div className='edit_name_lession'>
                      <InputLabel style={{ marginBottom: "10px" }} required>Tên bài học </InputLabel>
                    </div>
                    <div>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={name} />
                    </div>
                    <div className='image_edit_lesstion'>
                      <div className='icon_image_upload'>
                        <ImageIcon className='icon_edit_customize_image' />
                      </div>
                      <div className='btn_edit_upload'>
                        <Button variant="contained" component="label">
                          Upload ảnh
                          <input hidden accept="image/*" multiple type="file" />
                        </Button>
                      </div>
                    </div>
                    <div className='descript_class'>
                      <InputLabel  >Mô tả nội dung bài học tại đây </InputLabel>
                      <div style={{ width: "100%", height: '200px' }}>
                        <ReactQuill
                          theme="snow"
                          value=""
                          onChange={() => console.log()}
                          placeholder={" Nhập mô tả nội dung bài học tại đây"}
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
                        <InputLabel style={{ marginBottom: "10px" }} required>Loại bài học </InputLabel>
                        <TextField
                          fullWidth
                          variant="outlined"
                          value="" />
                      </div>
                      <div className='time_lession'>
                        <InputLabel style={{ marginBottom: "10px" }} required>Thời lượng </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          fullWidth
                          endAdornment={<InputAdornment position="end">/giờ</InputAdornment>}
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                        />
                      </div>
                    </div>
                    <div className='setting_lession'>
                      <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group" required>Cài đặt bài học </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={valueChoice}
                          onChange={handleChange}
                        >
                          <FormControlLabel value="1" control={<Radio />} label="Công khai" />
                          <FormControlLabel value="0" control={<Radio />} label="Không công khai" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                }
                <div className='Save_cancel_edit'>
                  <div className='cancel_edit'>
                    <Button variant="outlined">Hủy</Button>
                  </div>
                  <div className='save_edit'>
                    <Button variant="contained">Lưu</Button>
                  </div>
                </div>
              </div>
            </div> :
            <div className='content_edit'>
              <div className='edit_name_lession'>
                <InputLabel style={{ marginBottom: "10px" }} required>Tên hoạt động </InputLabel>
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={name} />
              </div>
              <div className='edit_name_lession'>
                <InputLabel style={{ marginBottom: "10px" }} required>Kiểu  hoạt động </InputLabel>
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="outlined"
                  value="Tự động chia nhóm" />
              </div>
              <div className='edit_name_lession'>
                <InputLabel style={{ marginBottom: "10px" }} required>Danh sách sinh viênviên </InputLabel>
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="outlined"
                  value="" />
              </div>
              <div className='descript_class'>
                <InputLabel  >Mô tả nội dung hoạt động </InputLabel>
                <div style={{ width: "100%", height: '200px' }}>
                  <ReactQuill
                    theme="snow"
                    value=""
                    onChange={() => console.log()}
                    placeholder={" Nhập mô tả nội dung hoạt động tại đây"}
                    // modules={modules('t1')}
                    formats={formats}
                    style={{ height: "200px" }}
                  />
                </div>
              </div>
              <div className="time_active">
                <InputLabel style={{ marginBottom: "10px" }} required>Thời lượng hoạt động  </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  type='number'
                  endAdornment={<InputAdornment position="end">/giờ</InputAdornment>}
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
                        checked={auth}
                        onChange={handleChangeActive}
                        aria-label="login switch"
                      />
                    }
                    label={"Yêu cầu hoàn thành"}
                  />
                </FormGroup>
              </div>
              <div className='Save_cancel_edit'>
                <div className='cancel_edit'>
                  <Button variant="outlined">Hủy</Button>
                </div>
                <div className='save_edit'>
                  <Button variant="contained">Lưu</Button>
                </div>
              </div>
            </div>
        }

      </DialogContent>
    </Dialog>
  )
}

export default ModalEditLession