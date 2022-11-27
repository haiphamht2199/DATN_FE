import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, Button, TextareaAutosize } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DescriptionLession from '../../component/lession/DescriptionLession';
import ProgramLession from '../../component/lession/ProgramLession';
import ExemLession from '../../component/lession/ExemLession';
const AddLesssion = ({ props }) => {
  const lession = useSelector((state) => state.lession);
  const [toggleState, setToggleState] = useState(1);
  const { quill, quillRef } = useQuill();
  const [nameLession, setNameLession] = useState(lession.nameLession);
  const [majors, setMajors] = useState(lession.majors);
  const dispatch = useDispatch();
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const styles = theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        minWidth: 230,
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 230,
    },
    smMargin: {
      margin: theme.spacing(1)
    }
  });
  const onchangeNameLession = (value) => {
    setNameLession(value)
    dispatch({
      type: 'CHANGE_NAME_LESSION',
      value
    })
  }
  const onchangeMajor = (value) => {
    setMajors(value);
    dispatch({
      type: 'CHANGE_MAJOR',
      value
    })
  }
  return (
    <>
      <div className='addLesstion_container'>
        <div className='preview'>
          <div className='icon_preview'>
            <ArrowBackIcon />
          </div>
          <div className='title_preview'> Quay lại trang tài khoản</div>
        </div>
        <div className='content_lession'>
          <div className='title_lession'>
            <Grid container>
              <Grid item xs={12}>
                <InputLabel style={{ marginBottom: "10px" }} required>Tên khóa học </InputLabel>
                <TextField
                  name="fullName"
                  variant="outlined"
                  fullWidth
                  required
                  value={nameLession}
                  onChange={(e) => onchangeNameLession(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ marginBottom: "10px" }} required>Bộ môn </InputLabel>
                <FormControl variant="outlined" fullWidth className={styles.formControl} >

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="bloodGroup"
                    fullWidth
                    value={majors}
                    onChange={(e) => onchangeMajor(e.target.value)}
                  >
                    <MenuItem value="0">Bộ môn sư phạm kĩ thuật</MenuItem>
                    <MenuItem value="1">Bộ môn Công nghệ giáo dục</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div className='description_lession'>
              <div className="bloc-tabs">
                <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Mô tả môn học
                </button>
                <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Chương trình giảng dạy
                </button>
                <button
                  className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(3)}
                >
                  Thi và kiểm tra
                </button>
                <button
                  className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(4)}
                >
                  Trao đổi
                </button>
              </div>

              <div className="content-tabs">
                {
                  toggleState === 1 &&
                  <DescriptionLession />
                }
                {
                  toggleState === 2 &&
                  <ProgramLession quill={quill} quillRef={quillRef} />
                }
                {
                  toggleState === 3 &&
                  <ExemLession />
                }

                <div
                  className={toggleState === 4 ? "content  active-content" : "content"}
                >

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddLesssion