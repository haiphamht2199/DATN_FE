import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import { Grid, TextField, Card, FormControl, InputLabel, Select, MenuItem, Button, TextareaAutosize } from "@material-ui/core";
import ImageIcon from '@mui/icons-material/Image';
import Moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import FeedIcon from '@mui/icons-material/Feed';
import axios from '../../helper/axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import UploadDocument from '../uploadFile/UploadDocument';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
function DescriptionLession() {
  const initialState = {
    id: 0,
    name: '',
    priority: 0,
    status: 1,
    apply_to: 0,
    customer_ids: [],
    customer_tags: [],
    exc_customer_tags: [],
    product_condition_type: 0,
    product_ids: [],
    product_collections: [],
    product_tags: [],
    discount_type: 0,
    discount_value: 0,
    start_date: null,
    end_date: null,
    data: null,
    exclude_from: 0
  };


  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const lession = useSelector((state) => state.lession);
  const _class = useSelector((state) => state._class);
  console.log("______class:", _class)
  let image = useSelector((state) => state._class.pathFileImage);
  console.log("image:", image)
  const [value, setValue] = useState("")
  // let startDate = useSelector((state) => state._class.dateTimeStart);
  // let endDate = _class.dateTimeEnd;
  const [description, setDescription] = useState(_class.description);
  const [startDate, setStartDate] = useState(new Date("2022/10/30 00:00:00"));
  console.log("startDate:", startDate)
  const [endDate, setEndDate] = useState("");
  const [isFieldDateErr, setIsFieldDateErr] = useState(false);
  console.log("gggahsdyhu:", _class);

  const changeStartDate = (value) => {
    startDate = value;
    dispatch({
      type: 'CHANGE_START_DATE',
      value: value
    })
  }
  const changeEndDate = useCallback((value) => {
    endDate = value;
    dispatch({
      type: 'CHANGE_END_DATE',
      value: value
    })
  }, [endDate])

  const handleChangeDecription = useCallback(async value => {

    dispatch({
      type: 'CHANGE_DECRIPTION',
      description: value
    })
    setDescription(value)
  }, [description])
  useEffect(() => {
    dispatch({
      type: "GET_ALL_MODULE_CLASS"
    })
  }, [])
  useEffect(() => {
    setDescription(_class.description)
  }, [_class.description])
  const handleImage = (e) => {
    let file = e.target.files[0];
    const imageData = new FormData();
    imageData.append("file_image_class", file);
    setValue({
      ...value,
      filePreview: URL.createObjectURL(file)
    })
    dispatch({
      type: 'UPLOAD_IMAGE_CLASS',
      payload: imageData
    })
  }

  const AddNewClassBtn = useCallback(async () => {
    if (_class.nameClass) {
      if (!startDate) {
        toast.warning("Ngày bắt đầu không được để trống!", {
          position: toast.POSITION.TOP_CENTER
        });
        return
      }
      if (!endDate) {
        toast.warning("Ngày kết thúc không được để trống!", {
          position: toast.POSITION.TOP_CENTER
        });
        return
      }
      if (!_class.class_id) {
        dispatch({
          type: 'ADD_NEW_CLASS_REST',
          payload: _class
        });
      } else {
        let data = {
          classId: _class.class_id,
          nameClass: _class.nameClass,
          moduleClassId: _class.moduleClassId,
          description: _class.description,
          dateTimeStart: _class.dateTimeStart,
          dateTimeEnd: _class.dateTimeEnd,
          pathFileImage: _class.pathFileImage,
          scope: _class.scope,
          idsRemoveDocuments: _class.listIdRemoveDocument
        }
        let editDocumentClassRequests = []
        if (_class.documentList.length) {
          _class.documentList.forEach(element => {
            editDocumentClassRequests.push({
              idDocumentClass: element.document_class_id ? element.document_class_id : "",
              nameDocumentClass: element.name_document,
              pathFileDocument: element.file_path_document
            })
          });
        }
        data.editDocumentClassRequests = editDocumentClassRequests;
        try {
          let dataEditRes = await axios.put('/teacher/classes/edit/create_class', data);
          if (dataEditRes.data.code === 200) {
            toast.success("Cập nhật lớp học thành công!", {
              position: toast.POSITION.TOP_CENTER
            });
            dispatch({
              type: 'GET_DETAIL_INFORMATION_CLASS_BY_ID',
              payload: _class.class_id
            });
            dispatch({
              type: 'GET_DETAIL_INFORMATION_AND_DOCUMENT_CLASS_BY_ID',
              payload: _class.class_id
            });
            setTimeout(() => {
              dispatch({
                type: 'GET_ALL_INFORMATION_CLASS_BY_ID',
                payload: _class.classDetail
              })
            }, 300)
          }

        } catch (error) {
          toast.error("Cập nhật lớp học thất bại!", {
            position: toast.POSITION.TOP_CENTER
          });
        }

      }


    } else {
      toast.error("Tên lớp học không được để trống!", {
        position: toast.POSITION.TOP_CENTER
      });
      return
    }

  }, [_class]);
  useEffect(() => {
    if (_class.success) {
      console.log("success:", _class.success)
      toast.success("Tạo lớp học thành công!", {
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout(() => {
        dispatch({
          type: 'DELETE_SUCCESS_ADD_CLASS'
        })
      }, 100)

    }
  }, [_class.success])
  const handleRemoveImage = useCallback(() => {
    dispatch({
      type: 'REMOVE_IMAGE_CLASS'
    })
  }, [_class]);
  const handleStartDateChange = useCallback((value) => {

    setIsFieldDateErr(false);

    let startDate = new Date(value);
    if (data.end_date && value) {
      let endDate = new Date(data.end_date);
      if (startDate > endDate) {
        setIsFieldDateErr(true);
        return;
      } else {
        setIsFieldDateErr(false)
      }
    } else {
      setIsFieldDateErr(false)
    }
    setStartDate(value);
    let _value = Moment(value).format('DD/MM/YYYY') + " " + Moment(value).format('HH:mm:ss')
    dispatch({
      type: 'CHANGE_START_DATE',
      value: _value
    })

    console.log("start_date:", value)
  }, [data, startDate, endDate]);

  const handleEndDateChange = useCallback((value) => {

    let endDate = new Date(value);
    if (data.start_date && value) {
      let startDate = new Date(data.start_date);
      if (startDate > endDate) {
        setIsFieldDateErr(true);
        return;
      } else {
        setIsFieldDateErr(false)
      }
    } else {
      setIsFieldDateErr(false)
    }
    setEndDate(value);
    let _value = Moment(value).format('DD/MM/YYYY') + " " + Moment(value).format('HH:mm:ss')
    dispatch({
      type: 'CHANGE_END_DATE',
      value: _value
    })
  }, [data, endDate, startDate]);
  return (
    <>
      <ToastContainer />
      <div
        className="content  active-content"
      >
        {
          image && <div className='remove_image_class' onClick={handleRemoveImage}>X</div>
        }
        <div className='image_class'>

          <div className='content_image'>

            {
              value ? <img src={value.filePreview} alt="updateimage" className='image_class_preview'></img> : image && <img src={require(`../../resource/${_class.pathFileImage}`)} alt="updateimage" className='image_class_preview'></img>

            }

          </div>

          {
            !image && <div className='icon_image'>
              <ImageIcon className='icon_customize_image' />

              <p style={{ fontWeight: "500", marginBottom: "10px" }}>Tải hình ảnh lớp học</p>
              <Button variant="contained" component="label" >
                Chọn thư mục
                <input onChange={handleImage} hidden accept="image/*" multiple type="file" />
              </Button>

            </div>
          }

        </div>
        <div className='descript_class'>
          <InputLabel required >Mô tả môn hoc</InputLabel>
          <div style={{ width: "100%", height: '300px' }}>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={handleChangeDecription}
              placeholder={" Nhập mô tả lớp học tại đây"}
              // modules={modules('t1')}
              formats={formats}
              style={{ height: "300px" }}
            />
          </div>

        </div>

        <div className='time_start_end_class'>

          <div className='start_time'>
            <InputLabel required >Ngày bắt đầu</InputLabel>
            <DatePicker
              id={"bss_pl_from_date"}
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              showTimeSelect
              maxDate={endDate}
              dateFormat={"MMMM d, yyyy h:mm aa"}
              isClearable={startDate != ''}
            />
          </div>
          <div className='end_time'>
            <InputLabel required >Ngày kết thúc</InputLabel>
            <DatePicker
              id={"bss_pl_from_date"}
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              showTimeSelect
              minDate={startDate}
              dateFormat={"MMMM d, yyyy h:mm aa"}
              isClearable={endDate != ''}
            />
          </div>

        </div>
        {
          <UploadDocument />
        }
        <div className='next_button'>
          <Button variant="contained" onClick={AddNewClassBtn}>{_class.class_id ? "Lưu lại" : "Tạo lớp học"}</Button>
        </div>
      </div>
    </>
  )
}

export default DescriptionLession