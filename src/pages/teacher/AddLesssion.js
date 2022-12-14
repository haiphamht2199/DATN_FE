import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, Button, TextareaAutosize } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DescriptionLession from '../../component/lession/DescriptionLession';
import ProgramLession from '../../component/lession/ProgramLession';
import ExemLession from '../../component/lession/ExemLession';
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
const AddLesssion = ({ props }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const _class = useSelector((state) => state._class);
  const [toggleState, setToggleState] = useState(useSelector(state => state._class.toggleState));
  const { quill, quillRef } = useQuill();
  const [nameLession, setNameLession] = useState(_class.nameClass);
  const [majors, setMajors] = useState(useSelector((state) => state._class.moduleClassId));

  const modules = useSelector((state) => state.moduleClass.modules);
  console.log("module:", modules)
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
  useEffect(() => {
    dispatch({
      type: 'GET_DETAIL_INFORMATION_CLASS_BY_ID',
      payload: searchParams.get("class_id")
    })
    dispatch({
      type: 'GET_DETAIL_INFORMATION_AND_DOCUMENT_CLASS_BY_ID',
      payload: searchParams.get("class_id")
    });
    dispatch({
      type: 'GET_DETAIL_INFORMATION_PROGRAM_CLASS_BY_ID',
      payload: searchParams.get("class_id")
    })
  }, [searchParams.get("class_id")]);
  useEffect(() => {
    if (_class.classDetail.class_id && _class.classDetail.documentList) {
      dispatch({
        type: 'GET_ALL_INFORMATION_CLASS_BY_ID',
        payload: _class.classDetail
      })
    }
  }, [_class.classDetail]);
  useEffect(() => {
    if (_class.classDetail.arrayProgram) {
      dispatch({
        type: 'GET_ALL_PROGRAM_CLASS_BY_ID',
        payload: _class.classDetail.arrayProgram
      })
    }
  }, [_class.classDetail]);
  useEffect(() => {
    setNameLession(_class.nameClass);
    setMajors(_class.moduleClassId)
  }, [_class])
  return (
    <>
      <div className='addLesstion_container'>
        <div className='preview'>
          <div className='icon_preview'>
            <ArrowBackIcon />
          </div>
          <div className='title_preview'> Quay l???i trang t??i kho???n</div>
        </div>
        <div className='content_lession'>
          <div className='title_lession'>
            <Grid container>
              <Grid item xs={12}>
                <InputLabel style={{ marginBottom: "10px" }} required>T??n kh??a h???c </InputLabel>
                <TextField
                  name="nameNewLession"
                  variant="outlined"
                  fullWidth
                  required
                  value={nameLession}
                  onChange={(e) => onchangeNameLession(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ marginBottom: "10px" }} required>B??? m??n </InputLabel>
                <FormControl variant="outlined" fullWidth className={styles.formControl} >

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="bloodGroup"
                    fullWidth
                    value={majors}
                    onChange={(e) => onchangeMajor(e.target.value)}
                  >
                    {
                      modules && modules.length && modules.map(item => (
                        <MenuItem value={item.module_class_id}>{item.name_module_class}</MenuItem>
                      ))
                    }
                    {/* <MenuItem value="0">B??? m??n s?? ph???m k?? thu???t</MenuItem>
                    <MenuItem value="1">B??? m??n C??ng ngh??? gi??o d???c</MenuItem> */}
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

                  M?? t??? m??n h???c

                </button>
                <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  {/* <Link to="/tao-bai-giang/tao-chuong-trinh-day"> */}
                  Ch????ng tr??nh gi???ng d???y
                  {/* </Link> */}
                </button>
                <button
                  className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(3)}
                >
                  Thi v?? ki???m tra
                </button>
                <button
                  className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(4)}
                >
                  Trao ?????i
                </button>
              </div>

              <div className="content-tabs">
                {
                  toggleState === 1 &&
                  <DescriptionLession setToggleState={setToggleState} />
                }
                {
                  toggleState === 2 &&
                  <ProgramLession setToggleState={setToggleState} />
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