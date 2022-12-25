import axios from 'axios'
import React, { ueState } from 'react'
import FileItem from './FileItem';
import { useDispatch, useSelector } from "react-redux";
const FileList = ({ files }) => {
  const dispatch = useDispatch();
  let LitsFile = useSelector((state) => state._class.documentList);
  console.log("LitsFile:", LitsFile)
  const deleteFileHandler = (_name, document_class_id) => {
    dispatch({
      type: 'DELETE_DOCUMENT_FILE',
      payload: _name, id: document_class_id
    })
  }
  return (
    <ul className="file-list">
      {
        LitsFile.length ?
          LitsFile.map(f => (<FileItem
            key={f.pathFileDocument}
            file={f}
            deleteFile={deleteFileHandler} />)) : ""
      }
    </ul>
  )
}

export default FileList